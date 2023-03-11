import { Page } from 'utils/libs/nextjs/types'

import CookContainer from '@src/components/cook/CookContainer'
import CookInstructionEnd from '@src/components/cook/CookInstructionEnd'
import { FullScreenLayout } from '@src/layouts/full-screen'
import { MainLayout } from '@src/layouts/main'

type Props = {}

const CookContainerPage: Page<Props> = () => (
  <FullScreenLayout>
    <CookContainer>
      <CookInstructionEnd />
    </CookContainer>
  </FullScreenLayout>
)

CookContainerPage.Layout = MainLayout

export default CookContainerPage
