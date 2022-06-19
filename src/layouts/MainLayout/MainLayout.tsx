import Navbar from '@src/components/navbar'

import { StyledMainContainer } from './MainLayout.styled'

const MainLayout = ({ children }: { children?: React.ReactChild }) => {
  return (
    <>
      <StyledMainContainer>{children}</StyledMainContainer>
      <Navbar />
    </>
  )
}
export { MainLayout }
