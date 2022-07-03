import { Page } from 'utils/libs/nextjs/types'

import CookContainer from '@src/components/cook/CookContainer'
import CookInstructionEnd from '@src/components/cook/CookInstructionEnd'
import { FullScreenLayout } from '@src/layouts/FullScreenLayout'
import { MainLayout } from '@src/layouts/MainLayout'

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
