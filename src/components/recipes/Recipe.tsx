import { sample } from 'lodash'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'

import { COOK_EMOJIS } from '@src/constants/food'
import { IRecipeInstruction, useRecipeQuery } from '@src/generated/gmd22-api'
import { initSkeletons } from '@src/utils/skeletons'

import { Div } from '../common/div/Div.styled'
import { Skeleton } from '../common/skeleton/Skeleton.styled'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { StyledRecipeItem, StyledRecipeItemContainer, StyledTimelineList } from './Recipes.styled'

const instructionsSkeletons = initSkeletons(4)

const FoodItem: FC = () => {
  const router = useRouter()
  const recipeId = router.query.recipeId as string

  const { loading, data } = useRecipeQuery({ variables: { recipeId } })
  const recipe = data?.recipe?.recipe

  const recipeInstructions:
    | (Pick<IRecipeInstruction, 'id' | 'description'> & {
        emoji?: string
      })[]
    | null
    | undefined = useMemo(
    () =>
      recipe?.recipeInstructions?.map(instruction => ({
        ...instruction,
        emoji: sample(COOK_EMOJIS),
      })),
    [recipe],
  )

  if (loading) {
    return (
      <Div center gap="large">
        <Header title="Recette" />
        <Skeleton width={200} />
        <StyledTimelineList gap={120}>
          {instructionsSkeletons.map(index => (
            <Div key={index} gap="large" row fullWidth center>
              <StyledRecipeItemContainer flexStart>
                <StyledRecipeItem>{index + 1}</StyledRecipeItem>
              </StyledRecipeItemContainer>
              <Div flex>
                <Text color="text-dark">
                  <Skeleton width={240} />
                  <Skeleton width={125} />
                </Text>
              </Div>
            </Div>
          ))}
        </StyledTimelineList>
      </Div>
    )
  }

  return (
    <Div center gap="large">
      <Header title="Recette" />
      <Text weight="bold" color="primary">
        {recipe?.name}
      </Text>
      <StyledTimelineList gap={120}>
        {recipeInstructions?.map((instruction, index) => (
          <Div key={instruction?.id} gap="large" row fullWidth center>
            <StyledRecipeItemContainer flexStart>
              <StyledRecipeItem>{index + 1}</StyledRecipeItem>
            </StyledRecipeItemContainer>
            <Div flex>
              <Text color="text-dark">
                {instruction?.description} {instruction.emoji}
              </Text>
            </Div>
          </Div>
        ))}
      </StyledTimelineList>
    </Div>
  )
}

export default FoodItem
