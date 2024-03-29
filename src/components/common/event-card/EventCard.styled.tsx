import { StaticImageData } from 'next/image'

import styled from '@emotion/styled'

export type TStyledEventCardProps = {
  backgroundImage?: StaticImageData
}
export const StyledEventCard = styled.div<TStyledEventCardProps>`
  width: 153px;
  height: 175px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: ${p => p.theme.border.radius.large}px;
  position: relative;

  > *:first-of-type {
    border-radius: ${p => p.theme.border.radius.large}px;
  }
`

export type TStyledCardSectionProps = {
  isCompleted?: boolean
}

export const StyledCardSection = styled.section<TStyledCardSectionProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  bottom: 0;
  height: 64px;
  width: 100%;
  padding: ${p => p.theme.spacing.padding.small}px;
  background-color: ${p => p.theme.color[p.isCompleted ? 'success' : 'background-light']};
  border-radius: 0px 0px ${p => p.theme.border.radius.large}px ${p => p.theme.border.radius.large}px;

  h4 {
    color: ${p => p.theme.color[p.isCompleted ? 'text-light' : 'text-dark']};
    font-weight: ${p => p.theme.text.weight.regular};
  }
`

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
