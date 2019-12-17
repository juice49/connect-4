import styled from 'styled-components'
import CellValue from '../types/cell-value'

interface CellProps {
  win?: boolean,
  value?: CellValue,
  decorative?: boolean
}

const colors = [
  '#4F1AC8',
  '#69E6EB'
]

const Cell = styled.div<CellProps>`
  position: relative;

  ${(props: CellProps) => {
    const hasValue = typeof props.value !== 'undefined' && props.value !== null

    if (hasValue && props.decorative) {
      return `
        background-color: ${colors[props.value]};
        border-radius: 50%;
      `
    }
  }}

  ${(props: CellProps) => props.win && `
    background-color: #DA03D0;
  `}

  outline: 1px solid red;
`

export default Cell
