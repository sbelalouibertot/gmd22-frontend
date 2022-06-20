import styled from '@emotion/styled'

export type TStyledTagProps = {}
export const StyledTag = styled.span<TStyledTagProps>`
  border-radius: ${p => p.theme.border.radius.large}px;
  background-color: ${p => p.theme.color.primary};
  font-size: ${p => p.theme.text.size['very-small']}px;
  width: fit-content;
  color: ${p => p.theme.color['text-light']};
  padding: ${p => p.theme.spacing.padding.xsmall}px ${p => p.theme.spacing.padding.small}px;
`
