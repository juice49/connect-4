import CellValue from '../types/cell-value'
import CellConnectionTest from '../types/cell-connection-test'

export default function findLine (
  cells: CellValue[],
  lineLength: number,
  value: CellValue,
  navigator: (cell: number) => number | undefined,
  line: number[] = [0],
  onTestCell: (test: CellConnectionTest) => void = () => {}
): number[] | null {
  while (line.length < lineLength) {
    const targetCellIndex = navigator(line[line.length - 1])
    const targetCellValue = cells[targetCellIndex]
    const targetCellExists = typeof targetCellIndex !== 'undefined'

    if (targetCellValue !== value) {
      if (targetCellExists) {
        onTestCell({
          path: [targetCellIndex],
          values: [targetCellValue],
          success: false
        })
      }

      return null
    }

    line = [...line, targetCellIndex]

    onTestCell({
      path: [targetCellIndex],
      values: [targetCellValue],
      ...(line.length === lineLength)
        ? { success: true }
        : {}
    })
  }

  return line
}
