import GridSize from '../types/grid-size'
import CellValue from '../types/cell-value'
import CellConnectionTest from '../types/cell-connection-test'
import * as navigators from './navigators'
import findLine from './find-line'

export default function findWin (
  gridSize: GridSize,
  cells: CellValue[],
  winningLineLength: number,
  onTestCell: (test: CellConnectionTest) => void = () => {}
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

    onTestCell({
      path: [cell],
      values: [value]
    })

    return directions.map(navigator => {
      const path = [cell]
      const values = [value]

      return findLine(
        cells,
        winningLineLength,
        value,
        navigator,
        [cell],
        test => {
          path.push(test.path[0])
          values.push(test.values[0])

          onTestCell({
            ...test,
            path,
            values
          })
        }
      )
    }).find(result => result)
  }, null)
}
