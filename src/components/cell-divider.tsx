import React from 'react'

const size = 22

interface CellDividerProps {
  color?: string,
  className?: string
}

const CellDivider: React.FC<CellDividerProps> = ({ color = '#fff', className }) => (
  <svg className={className} width={size} height={size}>
    <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke={color} strokeWidth={2} />
    <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke={color} strokeWidth={2} />
  </svg>
)

export default CellDivider
