import GridSize from '../types/grid-size'
import Coordinates from '../types/coordinates'
import getCoordinates from './get-coordinates'

export function x (
  gridSize: GridSize,
  cell: number,
  distance: number
): number | undefined {
  const [, currentRow] = getCoordinates(gridSize, cell)
  const targetCell = cell + distance
  const [, targetRow] = getCoordinates(gridSize, targetCell)

  if (targetRow === currentRow) {
    return targetCell
  }
}

export function y (
  [gridWidth, gridHeight]: GridSize,
  cell: number,
  distance: number
): number | undefined {
  const targetCell = cell + (distance * gridWidth)
  const gridLength = gridWidth * gridHeight

  if (targetCell < gridLength) {
    return targetCell
  }
}

export function xy (
  gridSize: GridSize,
  cell: number,
  [distanceX, distanceY]: Coordinates
): number | undefined {
  const targetCellY = y(gridSize, cell, distanceY)

  if (typeof targetCellY !== 'undefined') {
    return x(gridSize, targetCellY, distanceX)
  }
}
