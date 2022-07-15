import { useFoodItemsQuery } from 'generated/gmd22-api'
import { FC } from 'react'

import UnknownImg from '@src/../public/img/unknown.jpeg'
import { FOOD_TYPE_TO_STR } from '@src/constants/food'

import AnimatedListItemWrapper from '../common/animations/AnimatedListItemWrapper'
import ListItem from '../common/list/ListItem'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { StyledList } from './Food.styled'

const Food: FC = () => {
  const { loading, data: foodItemsData, fetchMore } = useFoodItemsQuery({
    notifyOnNetworkStatusChange: true,
  })
  const foodItems = foodItemsData?.foodItems?.foodItems
  const total = foodItemsData?.foodItems?.total ?? 0

  const onBottomReached = () => {
    if (foodItems && foodItems.length < total && !loading) {
      fetchMore({
        variables: { pagination: { skip: foodItems.length } },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.foodItems || !previousResult?.foodItems?.foodItems) {
            return previousResult
          }
          const previousFoodItems = previousResult.foodItems.foodItems
          const nextFoodItems = fetchMoreResult.foodItems?.foodItems
          return {
            foodItems: {
              total: fetchMoreResult.foodItems.total,
              foodItems: previousFoodItems.concat(nextFoodItems),
            },
          }
        },
      })
    }
  }

  return (
    <>
      <Header title="Ingrédients" />
      <Text color="text-lighter" size="very-small">
        {total} résultat{total > 1 && 's'}
      </Text>
      <StyledList onBottomReached={onBottomReached}>
        {foodItems?.map(
          item =>
            !!item &&
            !!item.type &&
            !!item.name && (
              <AnimatedListItemWrapper>
                <ListItem
                  key={item.id}
                  title={item.name}
                  avatar={item.image ?? UnknownImg}
                  details={FOOD_TYPE_TO_STR[item.type]}
                  linkTo={`/food/${item.id}`}
                />
              </AnimatedListItemWrapper>
            ),
        )}
      </StyledList>
    </>
  )
}

export default Food
