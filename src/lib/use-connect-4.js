import { useState, useEffect } from 'react'

export default function useConnect4 (gridSize) {
  const [cells, setCells] = useState(() => generateCells(gridSize))

  return {
    placeCounter: index => setCells(cells => {
      return placeCounter(cells, index)
    }),
    cells
  }
}

function generateCells ([gridWidth, gridHeight]) {
  const length = gridWidth * gridHeight
  return Array.from({ length }, () => null)
}

function placeCounter (cells, index) {
  // 1. get column by index
  // 2. get empty row in column

  console.log('place counter', cells)
  return cells
}

function getColumn (index, gridWidth) {

}
