import { Page } from 'utils/libs/nextjs/types'

import FoodView from '@src/components/food/FoodView'
import { MainLayout } from '@src/layouts/MainLayout'

type Props = {}

const Food: Page<Props> = () => <FoodView />

Food.Layout = MainLayout

export default Food
