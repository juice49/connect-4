import GridSize from '../types/grid-size'
import Coordinates from '../types/coordinates'

export default function getCoordinates (
  [gridWidth]: GridSize,
  index: number
): Coordinates {
  return [
    Math.floor(index % gridWidth),
    Math.floor(index / gridWidth)
  ]
}
