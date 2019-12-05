import { useState, useEffect } from 'react'
import GridSize from '../types/grid-size'
import getColumn from './get-column'
import findWin from './find-win'
import generateCells from './generate-cells'
import getNextCellInColumn from './get-next-cell-in-column'

type CellValue = 0 | 1 | null

interface Connect4Api {
  placeCounter: (index: number) => void,
  cells: CellValue[],
  nextValue: CellValue,
  winningLine?: number[],
  winningValue?: CellValue
}

export default function useConnect4 (
  gridSize: GridSize,
  winningLineLength: number = 4
): Connect4Api {
  const [cells, setCells] = useState(() => generateCells(gridSize))
  const [nextValue, setNextValue] = useState<CellValue>(0)
  const winningLine = findWin(cells, gridSize, winningLineLength)
  const winningValue = winningLine && cells[winningLine[0]]

  const placeCounter = (index: number) => {
    setCells(cells => insertCell(gridSize, cells, index, nextValue))
    setNextValue((1 - nextValue) as CellValue)
  }

  return {
    placeCounter,
    cells,
    nextValue,
    winningLine,
    winningValue
  }
}

function insertCell (
  gridSize: GridSize,
  cells: CellValue[],
  index: number,
  value: CellValue
): CellValue[] {
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
