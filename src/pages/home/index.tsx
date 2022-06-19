import { Page } from 'utils/libs/nextjs/types'

import Home from '@src/components/home/Home'
import { MainLayout } from '@src/layouts/MainLayout'

type Props = {}

const HomeContainer: Page<Props> = () => (
  <MainLayout>
    <Home />
  </MainLayout>
)

HomeContainer.Layout = MainLayout

export default HomeContainer
