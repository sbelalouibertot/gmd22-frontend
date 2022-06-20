import styled from '@emotion/styled'

import { Div } from '../common/div/Div.styled'
import List from '../common/list/List'

export const StyledList = styled(List)`
  display: flex;
  justify-items: center;
  align-items: center;
`

export const StyledFoodCard = styled(Div)`
  width: 327px;
  height: 284px;
  border-radius: ${p => p.theme.border.radius.large}px;
  background-color: ${p => p.theme.color.secondary};
  padding: ${p => p.theme.spacing.padding.medium}px;
`
