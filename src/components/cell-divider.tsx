import React from 'react'
import styled from 'styled-components'

interface CellDividerProps {
  color?: string,
  className?: string,
  size?: number
}

const CellDivider: React.FC<CellDividerProps> = ({ color = '#fff', size = 22 }) => (
  <Container width={size} height={size}>
    <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke={color} strokeWidth={2} />
    <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke={color} strokeWidth={2} />
  </Container>
)

export default CellDivider

const Container = styled.svg`
  position: absolute;
  transform: translate(50%, 50%);
  right: calc(var(--grid-gap) * -0.5);
  bottom: calc(var(--grid-gap) * -0.5);
`
