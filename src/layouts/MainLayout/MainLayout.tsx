import Header from '@src/components/header'
import Navbar from '@src/components/navbar'

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
