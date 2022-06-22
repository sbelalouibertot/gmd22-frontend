import styled from '@emotion/styled'

import { TTheme } from '@src/styles/design-system/theme'

export type TDivProps = {
  row?: boolean
  spaceBetween?: boolean
  fullWidth?: boolean
  center?: boolean
  start?: boolean
  gap?: keyof TTheme['spacing']['gap']
  percentWidth?: number
}

const getFlexDirection = ({
  center,
  start,
  spaceBetween,
}: Pick<TDivProps, 'center' | 'start' | 'spaceBetween'>) => {
  if (center) {
    return 'center'
  }
  if (spaceBetween) {
    return 'space-between'
  }
  if (start) {
    return 'flex-start'
  }
  return 'center'
}

export const Div = styled.div<TDivProps>`
  display: flex;
  flex-direction: ${p => (p.row ? 'row' : 'column')};
  justify-content: ${p => getFlexDirection(p)};
  align-content: ${p => getFlexDirection(p)};

  ${p => p.center && `justify-items: center; align-items: center;`}
  ${p => p.percentWidth && `width: ${p.percentWidth}%;`}
  ${p => p.fullWidth && `width: 100%;`}
  ${p => p.gap && `gap: ${p.theme.spacing.gap[p.gap]}px;`}
`
