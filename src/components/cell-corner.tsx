import React from 'react'

const size = 11

export enum Corner {
  TopLeft,
  TopRight,
  BottomRight,
  BottomLeft
}

interface CellCornerProps {
  color?: string,
  className?: string,
  strokeWidth?: number,
  corner?: Corner
}

const CellCorner: React.FC<CellCornerProps> = ({
  color = '#fff',
  strokeWidth = 2,
  corner = Corner.TopLeft,
  className
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    css={`
      transform: rotate(${corner * 90}deg);
    `}
  >
    <line
      x1={0}
      y1={strokeWidth / 2}
      x2={size}
      y2={strokeWidth / 2}
      stroke={color}
      strokeWidth={2}
    />
    <line
      x1={strokeWidth / 2}
      y1={0}
      x2={strokeWidth / 2}
      y2={size}
      stroke={color}
      strokeWidth={2}
    />
  </svg>
)

export default CellCorner
