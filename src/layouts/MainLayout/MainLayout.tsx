import Navbar from '@src/components/Navbar'
import Header from '@src/components/Header'
import React, { FC } from 'react'

const MainLayout = ({ children }: { children?: React.ReactChild }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Navbar />
    </>
  )
}
export { MainLayout }
