import { y } from './navigators'

export default function * getColumnCells (gridSize, cell) {
  do {
    yield cell
    cell = y(gridSize, cell, 1)
  } while (cell < gridSize[0] * gridSize[1])
}
