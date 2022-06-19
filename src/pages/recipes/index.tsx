import { Page } from 'utils/libs/nextjs/types'

import Recipes from '@src/components/recipes/Recipes'
import { MainLayout } from '@src/layouts/MainLayout'

type Props = {}

const RecipesContainer: Page<Props> = () => (
  <MainLayout>
    <Recipes />
  </MainLayout>
)

RecipesContainer.Layout = MainLayout

export default RecipesContainer
