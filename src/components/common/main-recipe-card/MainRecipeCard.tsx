import { FC, useMemo } from 'react'

import { IRecipe } from '@src/generated/gmd22-api'

import { Div } from '../div/Div.styled'
import { Skeleton } from '../skeleton/Skeleton.styled'
import {
  StyledDuration,
  StyledImageBackground,
  StyledMainRecipeCard,
  StyledMainRecipeCardContainer,
  StyledSubtitle,
  StyledTitle,
} from './MainRecipeCard.styled'

type TMainRecipeCardProps = {
  title: string
  recipe: Pick<IRecipe, 'name' | 'preparationDuration' | 'cookingDuration'> | null
  loading: boolean
}

const MainRecipeCard: FC<TMainRecipeCardProps> = ({ title, recipe, loading }) => {
  const recipeDuration = useMemo(() => {
    if (!recipe) {
      return 0
    }
    return (recipe.preparationDuration ?? 0) + (recipe.cookingDuration ?? 0)
  }, [recipe])

  return (
    <StyledMainRecipeCardContainer>
      <StyledMainRecipeCard>
        <Div>
          <StyledTitle>{title}</StyledTitle>
          <StyledSubtitle>{loading ? <Skeleton width={250} /> : recipe?.name}</StyledSubtitle>
        </Div>
        <StyledDuration>
          <span>{loading ? <Skeleton height={30} width={50} /> : recipeDuration}</span> min
        </StyledDuration>
      </StyledMainRecipeCard>
      <StyledImageBackground />
    </StyledMainRecipeCardContainer>
  )
}

export default MainRecipeCard
