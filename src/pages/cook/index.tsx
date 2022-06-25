import { Page } from 'utils/libs/nextjs/types'

import Cook from '@src/components/cook/Cook'
import { FullScreenLayout } from '@src/layouts/FullScreenLayout'
import { MainLayout } from '@src/layouts/MainLayout'

type Props = {}

const CookContainer: Page<Props> = () => (
  <FullScreenLayout>
    <Cook />
  </FullScreenLayout>
)

CookContainer.Layout = MainLayout

export default CookContainer
