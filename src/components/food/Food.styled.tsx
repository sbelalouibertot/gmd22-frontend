import Image from 'next/image'

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
  border-radius: ${p => p.theme.border.radius.large}px;
  background-color: ${p => p.theme.color['background-light']};
  border: 1px solid ${p => p.theme.color['background-dark']};
  padding: ${p => p.theme.spacing.padding.medium}px;
`

export const StyledFoodImage = styled(Image)`
  border-radius: ${p => p.theme.border.radius.large}px;
`
