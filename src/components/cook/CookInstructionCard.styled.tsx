import styled from '@emotion/styled'

export const StyledInstructionCard = styled.div`
  width: 276px;
  height: 100%;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.08));
  border-radius: ${p => p.theme.border.radius.large}px;
  background-color: ${p => p.theme.color['background-dark']};
  position: relative;
  > * {
    padding: ${p => p.theme.spacing.padding.small}px;
  }
`

export type TStyledCardSectionProps = {
  isCompleted?: boolean
}

export const StyledCardHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const StyledCardFooter = styled.footer<TStyledCardSectionProps>`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  bottom: 0;
  height: 30px;
  width: 100%;
  background-color: ${p => p.theme.color[p.isCompleted ? 'success' : 'background-light']};
  border-radius: 0px 0px ${p => p.theme.border.radius.large}px ${p => p.theme.border.radius.large}px;
`
