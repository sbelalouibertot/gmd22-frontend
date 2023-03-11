import { Page } from 'utils/libs/nextjs/types'

import ShoppingList from '@src/components/shopping-list/ShoppingList'
import { MainLayout } from '@src/layouts/main'

type Props = {}

const ShoppingListContainer: Page<Props> = () => (
  <MainLayout>
    <ShoppingList />
  </MainLayout>
)

ShoppingListContainer.Layout = MainLayout

export default ShoppingListContainer
