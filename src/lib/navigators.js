import getRow from './get-row'

export function x (index, distance, gridWidth) {
  const currentRowIndex = getRow(index, gridWidth)
  const targetCellIndex = index + distance
  const targetRowIndex = getRow(targetCellIndex, gridWidth)

  return targetRowIndex === currentRowIndex
    ? targetCellIndex
    : undefined
}

export function y (index, distance, gridWidth) {
  return index + (distance * gridWidth)
}

export function xy (index, [distanceX, distanceY], gridWidth) {
  const targetCellYIndex = y(index, distanceY, gridWidth)
  return x(targetCellYIndex, distanceX, gridWidth)
}
