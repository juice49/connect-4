import styled from 'styled-components'

const Cell = styled.div`
  outline: 2px solid pink;

  ${props => props.win && `
    background-color: green;
  `}
`

export default Cell
