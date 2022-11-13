import sample from 'lodash/sample'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'

import Link from '@src/components/common/link/Link'
import { COOK_EMOJIS } from '@src/constants/food'
import { IRecipeInstruction, useRecipeQuery } from '@src/generated/gmd22-api'
import { truthy } from '@src/utils/other'
import { initSkeletons } from '@src/utils/skeletons'

import AnimatedListItemWrapper from '../common/animations/AnimatedListItemWrapper'
import { Div } from '../common/div/Div.styled'
import List from '../common/list/List'
import { Skeleton } from '../common/skeleton/Skeleton.styled'
import Tag from '../common/tag/Tag'
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
      recipe?.recipeInstructions?.filter(truthy).map(instruction => ({
        ...instruction,
        emoji: sample(COOK_EMOJIS),
      })),
    [recipe],
  )

  const recipeFoodItems: {
    id: string
    name: string
    quantity: number
    unit?: string
  }[] = useMemo(() => {
    if (!recipe?.recipeFoodItems) {
      return []
    }
    return recipe.recipeFoodItems
      .map(
        foodItem =>
          !!foodItem?.foodId &&
          !!foodItem.food?.name &&
          !!foodItem.quantity && {
            id: foodItem.foodId,
            name: foodItem.food.name,
            quantity: foodItem.quantity,
            unit: foodItem.quantityUnit ?? undefined,
          },
      )
      .filter(truthy)
  }, [recipe?.recipeFoodItems])

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
      <List horizontal wrap gap="small">
        {recipeFoodItems.map(foodItem => (
          <Link key={foodItem.id} href={`/food/${foodItem.id}`}>
            <Tag>
              <Text>{foodItem.name}</Text>
              <Text color="text-light" weight="light" size="very-small">
                {foodItem.quantity} {foodItem.unit}
              </Text>
            </Tag>
          </Link>
        ))}
      </List>
      <StyledTimelineList gap={120}>
        {recipeInstructions?.map((instruction, index) => (
          <AnimatedListItemWrapper key={instruction?.id}>
            <Div gap="large" row fullWidth center>
              <StyledRecipeItemContainer flexStart>
                <StyledRecipeItem>{index + 1}</StyledRecipeItem>
              </StyledRecipeItemContainer>
              <Div flex>
                <Text color="text-dark">
                  {instruction?.description} {instruction.emoji}
                </Text>
              </Div>
            </Div>
          </AnimatedListItemWrapper>
        ))}
      </StyledTimelineList>
    </Div>
  )
}

export default FoodItem
