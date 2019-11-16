import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import findWin from '../lib/find-win'
import useConnect4 from '../lib/use-connect-4'
import Board from './board'
import Cell from './cell'

const gridSize = [7,6]
const winningLineLength = 4

const App = () => {
  const {
    cells,
    placeCounter,
    nextValue,
    winningValue,
    winningLine
  } = useConnect4(gridSize)

  const [playerNames] = useState(['Player 1', 'Player 2'])

  return (
    <>
      <Board gridSize={gridSize}>
        {cells.map((value, index) => (
          <Cell key={index} onClick={() => placeCounter(index)}>
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

export default hot(module)(App)
