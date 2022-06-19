import styled from '@emotion/styled'

export const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  background-color: ${p => p.theme.color.background};
  height: calc(100% - 115px);
  position: absolute;
  overflow-y: scroll;
  width: 100%;
  top: 0;
  padding: ${p => p.theme.spacing.padding.large}px;
  gap: ${p => p.theme.spacing.gap.large}px;
`
