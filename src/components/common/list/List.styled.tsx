import styled from '@emotion/styled'

export type TStyledListProps = {
  horizontal?: boolean
  forceScrollVisibility?: boolean
  verticalPadding?: boolean
  horizontalPadding?: boolean
}
export const StyledList = styled.ul<TStyledListProps>`
  display: flex;
  flex-direction: ${p => (p.horizontal ? 'row' : 'column')};
  gap: ${p => p.theme.spacing.gap.medium}px;

  ${p =>
    p.verticalPadding &&
    `padding-top: ${p.theme.spacing.padding.medium}px; padding-bottom: ${p.theme.spacing.padding.medium}px;`}
  ${p =>
    p.horizontalPadding &&
    `padding-left: ${p.theme.spacing.padding.medium}px; padding-right: ${p.theme.spacing.padding.medium}px;`}
  

  ${p => !p.forceScrollVisibility && `width: 100%;`}
  ${p =>
    p.forceScrollVisibility &&
    `overflow-y: auto; 
    margin-right: -${p.theme.spacing.margin.large}px;
    padding-right: ${p.theme.spacing.padding.medium}px;`}
`
