import { Page } from 'utils/libs/nextjs/types'

import { MainLayout } from '@src/layouts/MainLayout'
import FoodView from '@src/components/food/FoodView'

type Props = {}

const Food: Page<Props> = () => <FoodView />

Food.Layout = MainLayout

export default Food
