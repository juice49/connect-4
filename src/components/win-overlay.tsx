import React from 'react'
import styled from 'styled-components'
import GridSize from '../types/grid-size'
import getCoordinates from '../lib/get-coordinates'

type Sizes = [number, number]

interface WinOverlayProps {
  gridSize: GridSize,
  winningLine?: number[],
  strokeWidth?: number
}

const WinOverlay: React.FC<WinOverlayProps> = ({
  gridSize,
  winningLine,
  strokeWidth = 20
}) => {
  const sizes = gridSize.map(size => 100 / size)

  const points = winningLine
    ? [
      winningLine[0],
      winningLine[winningLine.length - 1]
    ]
    : []

  const [from, to] = points.map(cell => {
    const coordinates = getCoordinates(gridSize, cell)
    return coordinates.map((coordinate, index) => `${coordinate * sizes[index]}%`)
  })

  return (
    <Container strokeWidth={strokeWidth} sizes={sizes}>
      <g
        transform={`translate(${strokeWidth / 2}, ${strokeWidth / 2})`}
      >
        {winningLine && (
          <line
            x1={from[0]}
            y1={from[1]}
            x2={to[0]}
            y2={to[1]}
            stroke='#F7F391'
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            style={{
              '--column-index': getCoordinates(gridSize, points[0])[0],
              '--row-index': getCoordinates(gridSize, points[0])[1]
            }}
            css={`
              transform: translate(
                calc(var(--grid-gap) * var(--column-index)),
                calc(var(--grid-gap) * var(--row-index))
              );
            `}
          />
        )}
      </g>
      <g
        sizes={sizes}
        strokeWidth={strokeWidth}
      >
        {Array.from({ length: gridSize[0] }, (value, x) =>
          Array.from({ length: gridSize[1] }, (value, y) => (
            <rect
              width={`${sizes[0]}%`}
              height={`${sizes[1]}%`}
              fill="transparent"
              x={`${sizes[0] * x}%`}
              y={`${sizes[1] * y}%`}
              style={{
                '--column-index': x,
                '--row-index': y
              }}
              css={`
                transform: translate(
                  calc(var(--grid-gap) * var(--column-index)),
                  calc(var(--grid-gap) * var(--row-index))
                );
                outline: 1px solid yellow;
              `}
            />
          ))
        )}
      </g>
    </Container>
  )
}

export default WinOverlay

interface ContainerProps {
  strokeWidth?: number,
  sizes: Sizes
}

// 100% - (var(--grid-gap) * 6)

const Container = styled.svg<ContainerProps>`
  position: absolute;
  /* width: 100%; */
  width: calc(100% - (var(--grid-gap) * (var(--grid-width) - 1)));
  /* height: 100%; */
  height: calc(100% - (var(--grid-gap) * (var(--grid-height) - 1)));

  overflow: visible;

  /* works with no grid-gap */
  ${(props: ContainerProps) => `
    left: calc(${props.sizes[0] / 2}% - ${props.strokeWidth / 2}px);
    top: calc(${props.sizes[1] / 2}% - ${props.strokeWidth / 2}px);
  `}

  outline: 2px solid red;
  outline: 1px solid green;
  /* mix-blend-mode: difference; */
`

Container.defaultProps = {
  strokeWidth: 0
}
