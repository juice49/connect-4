import React from 'react'
import CellCorner, { Corner } from './cell-corner'

const BoardCorners = () => (
  <>
    <CellCorner
      css={`
        position: absolute;
        left: 0;
        top: 0;
      `}
      corner={Corner.TopLeft}
    />
    <CellCorner
      css={`
        position: absolute;
        right: 0;
        top: 0;
      `}
      corner={Corner.TopRight}
    />
    <CellCorner
      css={`
        position: absolute;
        right: 0;
        bottom: 0;
      `}
      corner={Corner.BottomRight}
    />
    <CellCorner
      css={`
        position: absolute;
        left: 0;
        bottom: 0;
      `}
      corner={Corner.BottomLeft}
    />
  </>
)

export default BoardCorners
