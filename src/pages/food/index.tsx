import { Page } from 'utils/libs/nextjs/types'

import Food from '@src/components/food/Food'
import { MainLayout } from '@src/layouts/MainLayout'

type Props = {}

const FoodContainer: Page<Props> = () => (
  <MainLayout>
    <Food />
  </MainLayout>
)

FoodContainer.Layout = MainLayout

export default FoodContainer
