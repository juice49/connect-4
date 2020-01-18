import React, { useState } from 'react'
import styled from 'styled-components'
import { useSprings, animated } from 'react-spring'
import useMeasure from 'react-use-measure'
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer'
import GridSize from '../types/grid-size'
import CellValue from '../types/cell-value'
import Coordinates from '../types/coordinates'
import useConnect4 from '../lib/use-connect-4'
import getCoordinates from '../lib/get-coordinates'
import BoardContainer, { BoardContainerItem } from './board-container'
import Board from './board'
import BoardCorners from './board-corners'
import Cell from './cell'
import CellDivider from './cell-divider'
import WinOverlay from './win-overlay'

declare global {
  interface Window {
    // This should probably be a type that represents ResizeObserver.
    ResizeObserver: any
  }
}

interface AppProps {
  gridSize?: GridSize,
  winningLineLength?: number
}

if (process.browser && ('ResizeObserver' in window === false)) {
  window.ResizeObserver = ResizeObserverPolyfill
}

const AnimatedCell = animated(Cell)

const App: React.FC<AppProps> = ({
  gridSize = [7, 6],
  winningLineLength = 4
}) => {
  const testData = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    1,
    null,
    null,
    null,
    null,
    null,
    null,
    1,
    0,
    0,
    0,
    0,
    null,
    null,
    1
  ] as CellValue[]

  const {
    cells,
    placeCounter,
    nextValue,
    winningValue,
    winningLine
  } = useConnect4(gridSize, winningLineLength, () => {}, testData)

  const [playerNames] = useState(['Player 1', 'Player 2'])

  const springs = useSprings(cells.length, cells.map((value, cell) => {
    const [, row] = getCoordinates(gridSize, cell)
    const offset = (row + 1) * -100
    return {
      transform: value === null
        ? `translate3d(0, ${offset}%, 0)`
        : 'translate3d(0, 0, 0)',
      opacity: value === null
        ? 0
        : 1
    }
  }))

  const [parentRef, parentRect] = useMeasure()
  const [refA, boundsA] = useMeasure()
  const [refB, boundsB] = useMeasure()

  const refs = winningLine
    ? {
      [winningLine[0]]: refA,
      [winningLine[winningLine.length - 1]]: refB
    }
    : {}

  let relativeCoords = null

  if (winningLine) {
    relativeCoords = (winningLine ? [boundsA, boundsB] : []).map<Coordinates>(rect => {
      if (!rect || !parentRect) {
        return null
      }

      return [
        (rect.left - parentRect.left) + (rect.width / 2),
        (rect.top - parentRect.top) + (rect.height / 2)
      ]
    }) as [Coordinates, Coordinates]
  }

  return (
    <Container
      style={{
        '--grid-gap': '1rem',
        '--grid-width': gridSize[0],
        '--grid-height': gridSize[1]
      }}
    >
      <BoardContainer>
        <BoardContainerItem decorative>
          <Board
            css={`
              display: block;
              position: relative;
              border: 2px solid #fff;
              transform: skew(4deg, 4deg) scale(1.15);
            `}
            gridSize={gridSize}
            decorative
          />
        </BoardContainerItem>
        <BoardContainerItem>
          <Board ref={parentRef} gridSize={gridSize} decorative>
            {cells.map((_, index) => {
              const [x, y] = getCoordinates(gridSize, index)
              return (
                <Cell
                  key={index}
                  ref={refs[index] || null}
                  win={winningLine && winningLine.includes(index)}
                >
                  {x !== gridSize[0] - 1 && y !== gridSize[1] - 1 && (
                    <CellDivider />
                  )}
                </Cell>
              )
            })}
            <BoardCorners />
          </Board>
        </BoardContainerItem>
        <BoardContainerItem decorative>
          <Board gridSize={gridSize} decorative>
            {springs.map((props, index) => (
              <AnimatedCell
                key={index}
                value={cells[index]}
                style={props}
                decorative
              />
            ))}
            {relativeCoords && (
              <WinOverlay coordinates={relativeCoords} />
            )}
          </Board>
        </BoardContainerItem>
        <BoardContainerItem decorative>
          <Board gridSize={[gridSize[0], 1]}>
            {Array.from({ length: gridSize[0] }, (_, index) => (
              <Cell
                key={index}
                as='button'
                onClick={() => placeCounter(index)}
                css={`
                  -webkit-appearance: none;
                  -webkit-tap-highlight-color: transparent;
                  cursor: pointer;
                  opacity: 0;
                `}
              >
                Place your counter in column {index + 1}
              </Cell>
            ))}
          </Board>
        </BoardContainerItem>
      </BoardContainer>
      {/* <div>
        {winningLine && (
          <div>
            <p>Winner: {playerNames[winningValue]}</p>
            <p>Line: {JSON.stringify(winningLine)}</p>
          </div>
        )}
        {!winningLine && (
          <p>Current turn: {playerNames[nextValue]}</p>
        )}
      </div> */}
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`