import { useState } from 'react'
import GridSize from '../types/grid-size'
import CellValue from '../types/cell-value'
import CellConnectionTest from '../types/cell-connection-test'
import getCoordinates from './get-coordinates'
import findWin from './find-win'
import generateCells from './generate-cells'
import getNextCellInColumn from './get-next-cell-in-column'

interface Connect4Api {
  placeCounter: (index: number) => void,
  cells: CellValue[],
  nextValue: CellValue,
  winningLine?: number[],
  winningValue?: CellValue,
}

export default function useConnect4 (
  gridSize: GridSize,
  winningLineLength: number = 4,
  onTestCell: (test: CellConnectionTest) => void = () => {},
  initialValue?: CellValue[]
): Connect4Api {
  const [cells, setCells] = useState(() => initialValue || generateCells(gridSize))
  const [nextValue, setNextValue] = useState<CellValue>(0)

  const winningLine = findWin(
    gridSize,
    cells,
    winningLineLength,
    onTestCell
  )

  const winningValue = winningLine && cells[winningLine[0]]

  const placeCounter = (cell: number) => {
    setCells(cells => insertCell(gridSize, cells, cell, nextValue))
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
  cell: number,
  value: CellValue
): CellValue[] {
  const nextCells = [...cells]
  const [columnIndex] = getCoordinates(gridSize, cell)
  const nextCell = getNextCellInColumn(gridSize, columnIndex, cells)

  if (nextCell === null) {
    // xxx handle illegal move
    return nextCells
  }

  nextCells[nextCell] = value
  return nextCells
}
