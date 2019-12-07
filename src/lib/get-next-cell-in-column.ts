import GridSize from '../types/grid-size'
import CellValue from '../types/cell-value'
import getColumnCells from './get-column-cells'

export default function getNextCellInColumn (
  gridSize: GridSize,
  column: number,
  cells: CellValue[]
): number | null {
  let previousCell = null

  if (cells[column] !== null) {
    return null
  }

  for (const cell of getColumnCells(gridSize, column)) {
    const cellValue = cells[cell]

    if (cellValue !== null && previousCell !== null) {
      return previousCell
    }

    previousCell = cell
  }

  return previousCell
}
