import styled from '@emotion/styled'

export const StyledFullScreenContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  background-color: ${p => p.theme.color.background};
  height: 100%;
  width: 100%;
  position: absolute;
  overflow-y: scroll;
  width: 100%;
  max-width: 100%;
  top: 0;
`
