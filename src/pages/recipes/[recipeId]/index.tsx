import { Page } from 'utils/libs/nextjs/types'

import Recipe from '@src/components/recipes/Recipe'
import { MainLayout } from '@src/layouts/main'

type Props = {}

const RecipeContainer: Page<Props> = () => (
  <MainLayout>
    <Recipe />
  </MainLayout>
)

RecipeContainer.Layout = MainLayout

export default RecipeContainer
