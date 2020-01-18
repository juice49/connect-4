import styled from 'styled-components'

const BoardContainer = styled.div`
  position: relative;
  flex: 1;
`

export default BoardContainer

interface BoardContainerItemProps {
  decorative?: boolean
}

export const BoardContainerItem = styled.div<BoardContainerItemProps>`
  display: flex;
  justify-content: center;

  ${(props: BoardContainerItemProps) => props.decorative && `
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  `}
`
