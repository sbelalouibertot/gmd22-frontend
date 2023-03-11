import { Page } from 'utils/libs/nextjs/types'

import CookContainer from '@src/components/cook/CookContainer'
import CookHome from '@src/components/cook/CookHome'
import { FullScreenLayout } from '@src/layouts/full-screen'
import { MainLayout } from '@src/layouts/main'

type Props = {}

const CookContainerPage: Page<Props> = () => (
  <FullScreenLayout>
    <CookContainer>
      <CookHome />
    </CookContainer>
  </FullScreenLayout>
)

CookContainerPage.Layout = MainLayout

export default CookContainerPage
