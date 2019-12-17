import styled from 'styled-components'

const BoardContainer = styled.div`
  position: relative
`

export default BoardContainer

interface BoardContainerItemProps {
  decorative?: boolean
}

export const BoardContainerItem = styled.div<BoardContainerItemProps>`
  ${(props: BoardContainerItemProps) => props.decorative && `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `}
`
