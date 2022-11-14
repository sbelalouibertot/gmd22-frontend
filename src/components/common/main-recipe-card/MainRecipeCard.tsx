import { FC, useMemo } from 'react'

import FoodImg from '@src/../public/img/food.jpeg'
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
  onClick?: VoidFunction
}

const MainRecipeCard: FC<TMainRecipeCardProps> = ({ title, recipe, loading, onClick }) => {
  const recipeDuration = useMemo(() => {
    if (!recipe) {
      return 0
    }
    return (recipe.preparationDuration ?? 0) + (recipe.cookingDuration ?? 0)
  }, [recipe])

  return (
    <StyledMainRecipeCardContainer onClick={onClick}>
      <Div flexStart fullWidth row absolute left={175} top={69}>
        <StyledImageBackground
          objectFit="none"
          src={FoodImg}
          alt="Food"
          priority
          height={214}
          width={214}
        />
      </Div>
      <StyledMainRecipeCard>
        <Div>
          <StyledTitle>{title}</StyledTitle>
          <StyledSubtitle>{loading ? <Skeleton width={250} /> : recipe?.name}</StyledSubtitle>
        </Div>
        <StyledDuration>
          <span>{loading ? <Skeleton height={30} width={50} /> : recipeDuration}</span> min
        </StyledDuration>
      </StyledMainRecipeCard>
    </StyledMainRecipeCardContainer>
  )
}

export default MainRecipeCard
