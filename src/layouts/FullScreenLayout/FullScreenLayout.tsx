import { ReactElement } from 'react'

import FadedPageWrapper from '@src/components/common/animations/FadedPageWrapper'

import { StyledFullScreenContainer } from './FullScreenLayout.styled'

const FullScreenLayout = ({ children }: { children?: ReactElement }) => {
  return (
    <FadedPageWrapper>
      <StyledFullScreenContainer>{children}</StyledFullScreenContainer>
    </FadedPageWrapper>
  )
}
export { FullScreenLayout }
