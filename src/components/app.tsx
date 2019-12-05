import React, { useState } from 'react'
import GridSize from '../types/grid-size'
import useConnect4 from '../lib/use-connect-4'
import Board from './board'
import Cell from './cell'

interface AppProps {
  gridSize?: GridSize,
  winningLineLength?: number
}

const App: React.FC<AppProps> = ({
  gridSize = [7, 6],
  winningLineLength = 4
}) => {
  const {
    cells,
    placeCounter,
    nextValue,
    winningValue,
    winningLine
  } = useConnect4(gridSize, winningLineLength)

  const [playerNames] = useState(['Player 1', 'Player 2'])

  return (
    <>
      <Board gridSize={gridSize}>
        {cells.map((value, index) => (
          <Cell
            key={index} onClick={() => placeCounter(index)}
            win={winningLine && winningLine.includes(index)}
          >
            {(value !== null) && value + 1}
          </Cell>
        ))}
      </Board>
      {winningLine && (
        <>
          <p>Winner: {playerNames[winningValue]}</p>
          <p>Line: {JSON.stringify(winningLine)}</p>
        </>
      )}
      {!winningLine && (
        <p>Current turn: {playerNames[nextValue]}</p>
      )}
    </>
  )
}

export default App
