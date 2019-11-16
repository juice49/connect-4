import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import findWin from '../lib/find-win'
import useConnect4 from '../lib/use-connect-4'
import Board from './board'
import Cell from './cell'

const gridSize = [7,6]
const winningLineLength = 4

const App = () => {
  const { cells, placeCounter, winningLine } = useConnect4(gridSize)

  return (
    <>
      <Board gridSize={gridSize}>
        {cells.map((value, index) => (
          <Cell key={index} onClick={() => placeCounter(index)}>
            {value}
          </Cell>
        ))}
      </Board>
      {winningLine && (
        <p>Winner: {JSON.stringify(winningLine)}</p>
      )}
    </>
  )
}

export default hot(module)(App)
