import { Page } from 'utils/libs/nextjs/types'

import FoodView from '@src/components/food/FoodView'
import { MainLayout } from '@src/layouts/MainLayout'

type Props = {}

const FoodContainer: Page<Props> = () => (
  <MainLayout>
    <FoodView />
  </MainLayout>
)

FoodContainer.Layout = MainLayout

export default FoodContainer
