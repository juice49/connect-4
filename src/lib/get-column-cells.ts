import GridSize from '../types/grid-size'
import { y } from './navigators'

export default function * getColumnCells (
  gridSize: GridSize,
  cell: number
): IterableIterator<number> {
  const gridLength = gridSize[0] * gridSize[1]

  do {
    yield cell
    cell = y(gridSize, cell, 1)
  } while (cell < gridLength)
}
