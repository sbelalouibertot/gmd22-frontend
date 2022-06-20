import styled from '@emotion/styled'

import { TTheme } from '@src/styles/design-system/theme'

export type TStyledTextProps = {
  color?: keyof TTheme['color']
  size?: keyof TTheme['text']['size']
  weight?: keyof TTheme['text']['weight']
  align?: 'right' | 'left' | 'center'
  firstLetterUppercase?: boolean
}
export const StyledText = styled.span<TStyledTextProps>`
  font-weight: ${p => p.theme.text.weight[p.weight ?? 'regular']};
  ${p => !!p.size && `font-size: ${p.theme.text.size[p.size]}px;`}
  ${p => !!p.color && `color: ${p.theme.color[p.color]};`}
  ${p => !!p.align && `text-align: ${p.align};`}

  &::first-letter {
    ${p => p.firstLetterUppercase && `text-transform: capitalize;`}
  }
`
