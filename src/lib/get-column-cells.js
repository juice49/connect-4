import { y } from './navigators'

export default function * getColumnCells ([gridWidth, gridHeight], cellIndex) {
  do {
    yield cellIndex
    cellIndex = y(cellIndex, 1, gridWidth)
  } while (cellIndex < gridWidth * gridHeight)
}
