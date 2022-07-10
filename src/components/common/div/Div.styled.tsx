import styled from '@emotion/styled'

import { TTheme } from '@src/styles/design-system/theme'

export type TDivProps = {
  row?: boolean
  flex?: boolean
  spaceBetween?: boolean
  fullWidth?: boolean
  center?: boolean
  flexStart?: boolean
  gap?: keyof TTheme['spacing']['gap']
  percentWidth?: number
  percentHeight?: number
  relative?: boolean
}

const getFlexDirection = ({
  center,
  flexStart,
  spaceBetween,
}: Pick<TDivProps, 'center' | 'flexStart' | 'spaceBetween'>) => {
  if (center) {
    return 'center'
  }
  if (spaceBetween) {
    return 'space-between'
  }
  if (flexStart) {
    return 'flex-start'
  }
  return 'center'
}

export const Div = styled.div<TDivProps>`
  display: flex;
  flex-direction: ${p => (p.row ? 'row' : 'column')};
  justify-content: ${p => getFlexDirection(p)};
  align-content: ${p => getFlexDirection(p)};

  ${p => p.relative && `position: relative;`}
  ${p => p.flex && `flex:1;`}
  ${p => p.center && `justify-items: center; align-items: center;`}
  ${p => p.percentWidth && `width: ${p.percentWidth}%;`}
  ${p => p.percentHeight && `height: ${p.percentHeight}%;`}
  ${p => p.fullWidth && `width: 100%;`}
  ${p => p.gap && `gap: ${p.theme.spacing.gap[p.gap]}px;`}
`
