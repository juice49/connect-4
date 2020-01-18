import React from 'react'
import styled from 'styled-components'
import Coordinates from '../types/coordinates'

interface WinOverlayProps {
  strokeWidth?: number,
  coordinates?: [Coordinates, Coordinates]
}

const WinOverlay: React.FC<WinOverlayProps> = ({
  coordinates,
  strokeWidth = 20
}) => {
  if (coordinates.some(coord => coord === null)) {
    return null
  }

  return (
    <Container strokeWidth={strokeWidth}>
      <g>
        <line
          x1={coordinates[0][0]}
          y1={coordinates[0][1]}
          x2={coordinates[1][0]}
          y2={coordinates[1][1]}
          stroke='#F7F391'
          strokeWidth={strokeWidth}
          strokeLinecap='round'
        />
      </g>
    </Container>
  )
}

export default WinOverlay

interface ContainerProps {
  strokeWidth: number
}

const Container = styled.svg<ContainerProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: visible;
  mix-blend-mode: difference;
`
