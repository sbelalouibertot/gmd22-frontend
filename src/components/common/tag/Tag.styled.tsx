import styled from '@emotion/styled'

import { TTheme } from '@src/styles/design-system/theme'

export type TStyledTagProps = { color?: keyof TTheme['color'] }
export const StyledTag = styled.span<TStyledTagProps>`
  display: flex;
  flex-direction: column;
  border-radius: ${p => p.theme.border.radius.large}px;
  background-color: ${p => p.theme.color[p.color ?? 'primary']};
  font-size: ${p => p.theme.text.size['very-small']}px;
  max-width: 130px;
  color: ${p => p.theme.color['text-light']};
  padding: ${p => p.theme.spacing.padding.xsmall}px ${p => p.theme.spacing.padding.small}px;
`
