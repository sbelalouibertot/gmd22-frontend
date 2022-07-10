import styled from '@emotion/styled'

import { TTheme } from '@src/styles/design-system/theme'

export type TStyledListProps = {
  horizontal?: boolean
  forceScrollVisibility?: boolean
  verticalPadding?: boolean
  horizontalPadding?: boolean
  fullHeight?: boolean
  gap?: keyof TTheme['spacing']['gap'] | number
  wrap?: boolean
}
export const StyledList = styled.ul<TStyledListProps>`
  display: flex;
  flex-direction: ${p => (p.horizontal ? 'row' : 'column')};
  gap: ${p => (typeof p.gap === 'number' ? p.gap : p.theme.spacing.gap[p.gap ?? 'medium'])}px;

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
  ${p => p.fullHeight && `height: 100%;`}
  scroll-behavior: smooth;
  ${p => p.wrap && `flex-wrap: wrap;`}
`
