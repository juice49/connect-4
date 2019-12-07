import CellValue from '../types/cell-value'
import GridSize from '../types/grid-size'

export default function generateCells (
  [gridWidth, gridHeight]: GridSize
): CellValue[] {
  const length = gridWidth * gridHeight
  return Array.from({ length }, () => null)
}
