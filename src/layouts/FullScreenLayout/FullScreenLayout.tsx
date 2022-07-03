import FadedPageWrapper from '@src/components/common/animations/FadedPageWrapper'

import { StyledFullScreenContainer } from './FullScreenLayout.styled'

const FullScreenLayout = ({ children }: { children?: React.ReactChild }) => {
  return (
    <FadedPageWrapper>
      <StyledFullScreenContainer>{children}</StyledFullScreenContainer>
    </FadedPageWrapper>
  )
}
export { FullScreenLayout }
