import CellValue from '../types/cell-value'

export default function findLine (
  cells: CellValue[],
  lineLength: number,
  value: CellValue,
  navigator: (cell: number) => number | undefined,
  line: number[] = [0]
): number[] | null {
  if (lineLength === 1) {
    return line
  }

  const targetCellIndex = navigator(line[line.length - 1])
  const targetCellValue = cells[targetCellIndex]

  if (targetCellValue !== value) {
    return null
  }

  if (targetCellIndex === null) {
    return null
  }

  if (typeof targetCellIndex === 'undefined') {
    return null
  }

  const nextLine = [...line, targetCellIndex]
  return findLine(cells, lineLength - 1, value, navigator, nextLine)
}