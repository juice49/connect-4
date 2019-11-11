import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import findWin from '../lib/find-win'
import useConnect4 from '../lib/use-connect-4'
import Board from './board'
import Cell from './cell'

const gridSize = [7,6]
const winningLineLength = 4

const state = [
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, 1   , null, null, null, null, null,
  null, 0   , 1   , null, null, null, null,
  null, 0   , 0   , 1   , null, null, null,
  1   , 1   , 0   , 0   , 1   , 0   , null
]

console.log(findWin(state, gridSize, winningLineLength))

const App = () => {
  const { cells, placeCounter } = useConnect4(gridSize)

  return (
    <Board gridSize={gridSize}>
      {cells.map((value, index) => (
        <Cell key={index} onClick={() => placeCounter(index)}>
          {value}
        </Cell>
      ))}
    </Board>
  )
}

export default hot(module)(App)
