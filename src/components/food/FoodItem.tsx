import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'

import UnknownImg from '@src/../public/img/unknown.jpeg'
import Link from '@src/components/common/link/Link'
import { FOOD_TYPE_TO_STR } from '@src/constants/food'
import { IRecipe, useFoodItemQuery } from '@src/generated/gmd22-api'
import { truthy } from '@src/utils/other'
import { initSkeletons } from '@src/utils/skeletons'

import { Div } from '../common/div/Div.styled'
import List from '../common/list/List'
import { Skeleton } from '../common/skeleton/Skeleton.styled'
import Tag from '../common/tag/Tag'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { StyledFoodCard, StyledFoodImage } from './Food.styled'

const tagSkeletons = initSkeletons(2)

const FoodItem: FC = () => {
  const router = useRouter()
  const foodItemId = router.query.foodId as string

  const { loading, data } = useFoodItemQuery({ variables: { foodItemId } })
  const foodItem = data?.foodItem?.foodItem

  const recipes: (Pick<IRecipe, 'id' | 'name'> & { isCurrent?: boolean })[] = useMemo(() => {
    if (!foodItem) {
      return []
    }
    const currentRecipes = foodItem?.currentRecipes
      ?.filter(truthy)
      .map(recipe => ({ ...recipe, isCurrent: true }))

    const currentRecipesIds = foodItem?.currentRecipes?.filter(truthy).map(recipe => recipe.id)

    const otherRecipes = foodItem?.recipes
      ?.filter(truthy)
      .filter(recipe => !currentRecipesIds?.includes(recipe.id))

    return [currentRecipes, otherRecipes].filter(truthy).flat()
  }, [foodItem])

  return (
    <>
      <Header title="Ingrédient" />
      <Div fullWidth>
        <Link href={'/food'}>
          <Text color="primary" align="right" size="small">
            Voir tous les ingrédients
          </Text>
        </Link>
      </Div>
      <StyledFoodCard spaceBetween gap="large">
        {loading ? (
          <Div gap="large">
            <Div gap="small">
              <Skeleton width={80} />
              <Skeleton width={140} height={12} />
            </Div>
            <Skeleton width={140} height={140} />
          </Div>
        ) : (
          <Div gap="large">
            <Div gap="xsmall">
              <Text>{foodItem?.name}</Text>
              {!!foodItem?.type && (
                <Text color="text-lighter" size="very-small">
                  {FOOD_TYPE_TO_STR[foodItem.type]}
                </Text>
              )}
            </Div>
            <StyledFoodImage
              src={foodItem?.image ?? UnknownImg}
              width={140}
              height={140}
              objectFit="cover"
              layout="fixed"
              alt="Food"
            />
          </Div>
        )}
        <List horizontal wrap>
          {loading
            ? tagSkeletons.map(id => <Skeleton key={id} width={130} />)
            : recipes.map(recipe => (
                <Tag
                  key={recipe?.id}
                  onClick={() => {
                    if (!!recipe.id) {
                      router.push(`/recipes/${recipe.id}`)
                    }
                  }}
                  {...(recipe.isCurrent && { color: 'success' })}
                >
                  {recipe?.name}
                </Tag>
              ))}
        </List>
      </StyledFoodCard>
    </>
  )
}

export default FoodItem
