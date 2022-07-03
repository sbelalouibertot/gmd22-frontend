import styled from '@emotion/styled'

import { Div, TDivProps } from '../common/div/Div.styled'
import List from '../common/list/List'

type TDayCardProps = {
  isSelected?: boolean
  isToday?: boolean
}

export const StyledDayCard = styled(Div)<TDivProps & TDayCardProps>`
  background-color: ${p =>
    p.isSelected ? p.theme.color.primary : p.theme.color['background-semi-dark']};
  border-radius: 7px;
  ${p => p.isToday && { border: `4px solid ${p.theme.color['border-dark']}` }}
  color: ${p => p.theme.color[p.isSelected ? 'text-light' : 'text-lighter']};
  width: 47px;
  height: 60px;
  padding: 8px 10px;
  position: relative;
  scroll-behavior: smooth;
`

export const StyledDayCardContainer = styled(Div)`
  max-width: calc(100% + 24px + 24px);
  overflow: auto;
  margin-right: -24px;
  margin-left: -24px;
  padding-right: 24px;
  padding-left: 24px;
  height: 85px;
  align-items: center;
  scroll-behavior: smooth;
`

export const StyledEventsIndicator = styled.div`
  text-shadow: 0 0 5px #cccccc;
  height: 20px;
  width: 20px;
  z-index: 99999909999;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -5px;
  text-align: center;
`

export const StyledTimelineList = styled(List)`
  position: relative;
`
