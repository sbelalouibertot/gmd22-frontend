import { useFoodItemsQuery } from 'generated/gmd22-api'
import router from 'next/router'
import { FC } from 'react'

import NextIcon from '@src/../public/img/icons/next.svg'
import PancakeImg from '@src/../public/img/pancake.jpeg'
import { FOOD_TYPE_TO_STR } from '@src/constants/food'

import AnimatedListItemWrapper from '../common/animations/AnimatedListItemWrapper'
import ListItem from '../common/list/ListItem'
import { Header } from '../header/Header'
import { StyledList } from './Food.styled'

const Food: FC = () => {
  const { /*loading,*/ data: foodItemsData } = useFoodItemsQuery()
  // const [mutate, { loading: deleteLoading }] = useDeleteFoodItemMutation({
  //   refetchQueries: [{ query: foodItemsQuery, variables: {} }],
  // })
  const foodItems = foodItemsData?.foodItems?.foodItems

  return (
    <>
      <Header title="Ingrédients" />
      <StyledList>
        {foodItems?.map(
          item =>
            !!item &&
            !!item.type &&
            !!item.name && (
              <AnimatedListItemWrapper>
                <ListItem
                  key={item.id}
                  title={item.name}
                  avatar={PancakeImg}
                  details={FOOD_TYPE_TO_STR[item.type]}
                  actionIcon={NextIcon}
                  onClick={() => router.push(`/food/${item.id}`)}
                  onActionClick={() => console.log('onClick')}
                />
              </AnimatedListItemWrapper>
            ),
        )}
      </StyledList>
    </>
  )
}

export default Food
