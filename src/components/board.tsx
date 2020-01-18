import styled from 'styled-components'
import GridSize from '../types/grid-size'

interface BoardProps {
  gridSize: GridSize,
  decorative?: boolean
}

const Board = styled.div<BoardProps>`
  display: grid;
  position: relative;
  grid-gap: var(--grid-gap, 0);
  width: 100%;
  max-width: 33rem;
  padding: var(--grid-gap, 0);

  ${(props: BoardProps) => `
    grid-template-columns: repeat(${props.gridSize[0]}, 1fr);
    grid-template-rows: repeat(${props.gridSize[1]}, auto);
  `}

  ${(props: BoardProps) => props.decorative && `
    grid-template-rows: repeat(${props.gridSize[1]}, 1fr);
  `}
`

export default Board

