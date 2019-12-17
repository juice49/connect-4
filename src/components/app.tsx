import React, { useState } from 'react'
import { useSprings, animated, config } from 'react-spring'
import GridSize from '../types/grid-size'
import CellValue from '../types/cell-value'
import useConnect4 from '../lib/use-connect-4'
import getCoordinates from '../lib/get-coordinates'
import BoardContainer, { BoardContainerItem } from './board-container'
import Board from './board'
import Cell from './cell'
import CellDivider from './cell-divider'
import CellCorner, { Corner } from './cell-corner'
import WinOverlay from './win-overlay'

interface AppProps {
  gridSize?: GridSize,
  winningLineLength?: number
}

const AnimatedCell = animated(Cell)

const App: React.FC<AppProps> = ({
  gridSize = [7, 6],
  winningLineLength = 4
}) => {
  /* const testData = [
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
    // 0,
    null,
    null,
    null,
    null,
    null,
    null,
    0,
    1,
    null,
    null,
    1,
    1,
    0,
    1,
    1,
    null,
    null,
    0,
    0,
    1,
    0,
    0,
    null,
    null
  ] as CellValue[] */

  const testData = [
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
    null,
    null,
    0,
    null,
    null,
    1,
    0,
    null,
    0,
    1,
    null,
    null,
    1,
    1,
    0,
    1,
    1,
    null,
    null,
    0,
    0,
    1,
    0,
    0,
    null,
    null
  ] as CellValue[]

  /* const testData = [
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
  ] as CellValue[] */

  /* const testData = null */

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

  return (
    <div
      css={`
        display: flex;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        /* --grid-gap: 0.5rem; */
        --grid-gap: 2.5rem;
        --grid-gap: 1rem;
        --grid-width: ${props => props.gridSize[0]};
        --grid-height: ${props => props.gridSize[1]};
      `}
      gridSize={gridSize}
    >
      <BoardContainer>
        <BoardContainerItem>
          <Board gridSize={gridSize} decorative>
            {cells.map((value, index) => {
              const [x, y] = getCoordinates(gridSize, index)
              return (
                <Cell key={index} win={winningLine && winningLine.includes(index)}>
                  {x !== gridSize[0] - 1 && y !== gridSize[1] - 1 && (
                    <CellDivider
                      css={`
                        position: absolute;
                        right: calc(var(--grid-gap) * -0.5);
                        bottom: calc(var(--grid-gap) * -0.5);
                        transform: translate(50%, 50%);
                      `}
                    />
                  )}
                </Cell>
              )
            })}
            <Corners />
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
            <WinOverlay
              gridSize={gridSize}
              winningLine={winningLine}
            />
          </Board>
        </BoardContainerItem>
        <BoardContainerItem decorative>
          <Board
            gridSize={[gridSize[0], 1]}
            css={`
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              opacity: 0;
            `}
          >
            {Array.from({ length: gridSize[0] }, (value, index) => (
              <Cell key={index} as='button' onClick={() => placeCounter(index)}>
                Drop your counter in column {index + 1}
              </Cell>
            ))}
          </Board>
        </BoardContainerItem>
      </BoardContainer>
      {/* winningLine && (
        <>
          <p>Winner: {playerNames[winningValue]}</p>
          <p>Line: {JSON.stringify(winningLine)}</p>
        </>
      )}
      {!winningLine && (
        <p>Current turn: {playerNames[nextValue]}</p>
      ) */}
    </div>
  )
}

export default App

const Corners = () => (
  <>
    <CellCorner
      css={`
        position: absolute;
        left: 0;
        top: 0;
      `}
      corner={Corner.TopLeft}
    />
    <CellCorner
      css={`
        position: absolute;
        right: 0;
        top: 0;
      `}
      corner={Corner.TopRight}
    />
    <CellCorner
      css={`
        position: absolute;
        right: 0;
        bottom: 0;
      `}
      corner={Corner.BottomRight}
    />
    <CellCorner
      css={`
        position: absolute;
        left: 0;
        bottom: 0;
      `}
      corner={Corner.BottomLeft}
    />
  </>
)
