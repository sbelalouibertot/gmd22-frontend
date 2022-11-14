import { ReactElement } from 'react'

import Navbar from '@src/components/navbar'

import { StyledMainContainer } from './MainLayout.styled'

const MainLayout = ({ children }: { children?: ReactElement }) => {
  return (
    <>
      <StyledMainContainer>{children}</StyledMainContainer>
      <Navbar />
    </>
  )
}
export { MainLayout }
