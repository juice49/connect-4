import getColumnCells from './get-column-cells'

export default function getNextCellInColumn (gridSize, column, cells) {
  let previousCell = null

  if (cells[column] !== null) {
    return null
  }

  for (const cell of getColumnCells(gridSize, column, cells)) {
    const cellValue = cells[cell]

    if (cellValue !== null && previousCell !== null) {
      return previousCell
    }

    previousCell = cell
  }

  return previousCell
}
