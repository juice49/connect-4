import styled from 'styled-components'
import GridSize from '../types/grid-size'

interface BoardProps {
  gridSize: GridSize,
  decorative?: boolean
}

const Board = styled.div<BoardProps>`
  display: inline-grid;
  position: relative;
  grid-gap: var(--grid-gap, 0);
  /* padding: 2rem; */
  ${(props: BoardProps) => `
    grid-template-columns: repeat(${props.gridSize[0]}, 4rem);
    grid-template-rows: repeat(${props.gridSize[1]}, auto);
  `}
  ${(props: BoardProps) => props.decorative && `
    grid-template-rows: repeat(${props.gridSize[1]}, 4rem);
  `}
`

export default Board

