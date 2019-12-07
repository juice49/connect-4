import GridSize from '../types/grid-size'
import Coordinates from '../types/coordinates'
import getCoordinates from './get-coordinates'

export function x (
  gridSize: GridSize,
  cell: number,
  distance: number
): number {
  const [, currentRow] = getCoordinates(gridSize, cell)
  const targetCell = cell + distance
  const [, targetRow] = getCoordinates(gridSize, targetCell)

  if (targetRow === currentRow) {
    return targetCell
  }
}

export function y (
  [gridWidth]: GridSize,
  cell: number,
  distance: number
): number {
  return cell + (distance * gridWidth)
}

export function xy (
  gridSize: GridSize,
  cell: number,
  [distanceX, distanceY]: Coordinates
): number {
  const targetCellY = y(gridSize, cell, distanceY)
  return x(gridSize, targetCellY, distanceX)
}
