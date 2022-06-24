import styled from '@emotion/styled'

import { Div } from '../common/div/Div.styled'
import List from '../common/list/List'

export const StyledList = styled(List)`
  display: flex;
  justify-items: center;
  align-items: center;
`

export const StyledTimelineList = styled(List)`
  position: relative;
`

export const StyledRecipeItemContainer = styled(Div)`
  height: 30px;
  width: 30px;
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    background-color: ${p => p.theme.color['background-semi-dark']};
    top: 10px;
    bottom: 20px;
    z-index: 0;
    left: 10px;
  }
`

export const StyledRecipeItem = styled(Div)`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.theme.color['background-light']};
  color: ${p => p.theme.color['text-lighter']};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  z-index: 1;
`
