import { Page } from 'utils/libs/nextjs/types'

import AllRecipes from '@src/components/recipes/AllRecipes'
import { MainLayout } from '@src/layouts/main'

type Props = {}

const RecipesContainer: Page<Props> = () => (
  <MainLayout>
    <AllRecipes />
  </MainLayout>
)

RecipesContainer.Layout = MainLayout

export default RecipesContainer
