import { useState, useEffect } from 'react'
import getColumn from './get-column'
import { y } from './navigators'
import findWin from './find-win'
import generateCells from './generate-cells'
import getNextCellInColumn from './get-next-cell-in-column'

export default function useConnect4 (gridSize) {
  const [cells, setCells] = useState(() => generateCells(gridSize))
  const [value, setValue] = useState(0)
  const winningLine = findWin(cells, gridSize, 4)

  const placeCounter = index => {
    setCells(cells => insertCell(gridSize, cells, index, value))
    setValue(1 - value)
  }

  return {
    placeCounter,
    cells,
    winningLine
  }
}

function insertCell (gridSize, cells, index, value) {
  const nextCells = [...cells]
  const columnIndex = getColumn(gridSize[0], index)
  const cell = getNextCellInColumn(gridSize, columnIndex, cells)

  if (cell === null) {
    // xxx handle illegal move
    return nextCells
  }

  nextCells[cell] = value
  return nextCells
}
