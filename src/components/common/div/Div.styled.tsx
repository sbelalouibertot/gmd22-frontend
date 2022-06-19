import styled from '@emotion/styled'

import { TTheme } from '@src/styles/design-system/theme'

export type TDivProps = {
  row?: boolean
  spaceBetween?: boolean
  fullWidth?: boolean
  center?: boolean
  gap?: keyof TTheme['spacing']['gap']
  percentWidth?: number
}

export const Div = styled.div<TDivProps>`
  display: flex;
  flex-direction: ${p => (p.row ? 'row' : 'column')};
  justify-content: ${p => (p.spaceBetween ? 'space-between' : 'center')};
  align-content: ${p => (p.spaceBetween ? 'space-between' : 'center')};

  ${p => p.center && `justify-items: center; align-items: center;`}
  ${p => p.percentWidth && `width: ${p.percentWidth}%;`}
  ${p => p.fullWidth && `width: 100%;`}
  ${p => !!p.gap && `gap: ${p.theme.spacing.gap[p.gap]}px;`}
`
