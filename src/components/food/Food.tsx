import { useFoodItemsQuery } from 'generated/gmd22-api'
import Image from 'next/image'
import { FC } from 'react'

import { FOOD_TYPE_TO_STR } from '@src/constants/food'

import { Div } from '../common/div/Div.styled'
import ListItem from '../common/list/ListItem'
import Text from '../common/text/Text'
import { StyledList } from './Food.styled'

const FoodView: FC = () => {
  const { loading, data: foodItemsData } = useFoodItemsQuery()
  // const [mutate, { loading: deleteLoading }] = useDeleteFoodItemMutation({
  //   refetchQueries: [{ query: foodItemsQuery, variables: {} }],
  // })
  const foodItems = foodItemsData?.foodItems?.foodItems

  return (
    <>
      <Div row spaceBetween fullWidth>
        <Image src="/img/icons/previous.svg" height={20} width={20} />
        <Text weight="bold">Liste de courses</Text>
        <Image src="/img/icons/edit.svg" height={25} width={25} />
      </Div>
      <StyledList>
        {foodItems?.map(
          item =>
            !!item &&
            !!item.type &&
            !!item.name && (
              <ListItem
                key={item.id}
                title={item.name}
                avatar={'/img/pancake.jpeg'}
                details={FOOD_TYPE_TO_STR[item.type]}
                actionIconPath={`/img/icons/next.svg`}
                onActionClick={() => console.log('onClick')}
              />
            ),
        )}
      </StyledList>
    </>
  )
}

export default FoodView
