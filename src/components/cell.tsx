import styled from 'styled-components'

interface CellProps {
  win?: boolean
}

const Cell = styled.div<CellProps>`
  outline: 2px solid pink;

  ${(props: CellProps) => props.win && `
    background-color: green;
  `}
`

export default Cell
