import GridSize from '../types/grid-size'
import CellValue from '../types/cell-value'
import * as navigators from './navigators'
import findLine from './find-line'

export default function findWin (
  gridSize: GridSize,
  cells: CellValue[],
  winningLineLength: number
): number[] | null {
  const directions = [
    // Down
    (cell: number) => navigators.y(gridSize, cell, 1),
    // Right
    (cell: number) => navigators.x(gridSize, cell, 1),
    // Bottom left
    (cell: number) => navigators.xy(gridSize, cell, [-1, 1]),
    // Bottom right
    (cell: number) => navigators.xy(gridSize, cell, [1, 1])
  ]

  return cells.reduce((
    reduced: number[] | null,
    value: CellValue,
    cell: number
  ): number[] | null => {
    if (reduced) {
      return reduced
    }

    if (value === null) {
      return reduced
    }

    return directions.map(navigator => {
      return findLine(cells, winningLineLength, value, navigator, [cell])
    }).find(result => result)
  }, null)
}
