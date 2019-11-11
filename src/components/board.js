import styled from 'styled-components'

const Board = styled.div`
  display: grid;
  outline: 2px solid purple;
  ${props => `
    grid-template-columns: repeat(${props.gridSize[0]}, 4rem);
    grid-template-rows: repeat(${props.gridSize[1]}, 4rem);
  `}
`

export default Board
