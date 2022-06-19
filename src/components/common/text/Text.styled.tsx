import styled from '@emotion/styled'

import { TTheme } from '@src/styles/design-system/theme'

export type TStyledTextProps = {
  bold?: boolean
  size?: keyof TTheme['text']['size']
  firstLetterUppercase?: boolean
}
export const StyledText = styled.span<TStyledTextProps>`
  font-weight: ${p => p.theme.text.weight[p.bold ? 'bold' : 'regular']};
  ${p => !!p.size && `font-size: ${p.theme.text.size[p.size]}px`}

  &::first-letter {
    ${p => p.firstLetterUppercase && `text-transform: capitalize;`}
  }
`
