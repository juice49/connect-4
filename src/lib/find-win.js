import * as navigators from './navigators'
import findLine from './find-line'

export default function findWin (cells, [gridWidth, gridHeight], winningLineLength) {
  const directions = [
    // Down
    index => navigators.y(index, 1, gridWidth),
    // Right
    index => navigators.x(index, 1, gridWidth),
    // Bottom left
    index => navigators.xy(index, [-1, 1], gridWidth),
    // Bottom right
    index => navigators.xy(index, [1, 1], gridWidth)
  ]

  return cells.reduce((reduced, cell, index) => {
    if (reduced) {
      return reduced
    }

    if (cell === null) {
      return reduced
    }

    return directions.map(navigator => {
      return findLine(cells, winningLineLength, cell, navigator, [index])
    }).find(result => result)
  }, null)
}
