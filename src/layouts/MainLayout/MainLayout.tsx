import Navbar from '@src/components/Navbar'
import Header from '@src/components/Header'

export type MainLayoutProps = {}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Navbar />
    </>
  )
}
export { MainLayout }
