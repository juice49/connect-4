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

  &:before {
    display: block;
    padding-top: 100%;
    content: '';
  }

  &:after {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    content: '';

    ${(props: CellProps) => {
      const hasValue = typeof props.value !== 'undefined' && props.value !== null

      if (hasValue && props.decorative) {
        return `
          background-color: ${colors[props.value]};
          border-radius: 50%;
        `
      }
    }}
  }
`

export default Cell
