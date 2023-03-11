import { Page } from 'utils/libs/nextjs/types'

import FoodItem from '@src/components/food/FoodItem'
import { MainLayout } from '@src/layouts/main'

type Props = {}

const FoodItemContainer: Page<Props> = () => (
  <MainLayout>
    <FoodItem />
  </MainLayout>
)

FoodItemContainer.Layout = MainLayout

export default FoodItemContainer
