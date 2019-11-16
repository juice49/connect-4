export default function generateCells ([gridWidth, gridHeight]) {
  const length = gridWidth * gridHeight
  return Array.from({ length }, () => null)
}
