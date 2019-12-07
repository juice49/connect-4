import styled from 'styled-components'
import GridSize from '../types/grid-size'

interface BoardProps {
  gridSize: GridSize
}

const Board = styled.div<BoardProps>`
  display: grid;
  outline: 2px solid purple;
  ${(props: BoardProps) => `
    grid-template-columns: repeat(${props.gridSize[0]}, 4rem);
    grid-template-rows: repeat(${props.gridSize[1]}, 4rem);
  `}
`

export default Board
