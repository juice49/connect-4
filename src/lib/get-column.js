export default function getColumn (gridWidth, index) {
  return Math.floor(index % gridWidth)
}
