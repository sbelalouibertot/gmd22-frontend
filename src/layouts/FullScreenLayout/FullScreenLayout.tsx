import { StyledFullScreenContainer } from './FullScreenLayout.styled'

const FullScreenLayout = ({ children }: { children?: React.ReactChild }) => {
  return <StyledFullScreenContainer>{children}</StyledFullScreenContainer>
}
export { FullScreenLayout }
