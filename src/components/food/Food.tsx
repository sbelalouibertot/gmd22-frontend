import { useFoodItemsQuery } from 'generated/gmd22-api'
import Image from 'next/image'
import router from 'next/router'
import { FC } from 'react'

import EditIcon from '@src/../public/img/icons/edit.svg'
import NextIcon from '@src/../public/img/icons/next.svg'
import PreviousIcon from '@src/../public/img/icons/previous.svg'
import PancakeImg from '@src/../public/img/pancake.jpeg'
import { FOOD_TYPE_TO_STR } from '@src/constants/food'

import { Div } from '../common/div/Div.styled'
import ListItem from '../common/list/ListItem'
import Text from '../common/text/Text'
import { StyledList } from './Food.styled'
const Food: FC = () => {
  const { /*loading,*/ data: foodItemsData } = useFoodItemsQuery()
  // const [mutate, { loading: deleteLoading }] = useDeleteFoodItemMutation({
  //   refetchQueries: [{ query: foodItemsQuery, variables: {} }],
  // })
  const foodItems = foodItemsData?.foodItems?.foodItems

  return (
    <>
      <Div row spaceBetween fullWidth>
        <Image src={PreviousIcon} height={20} width={20} />
        <Text weight="bold">Ingrédients</Text>
        <Image src={EditIcon} height={25} width={25} />
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
                avatar={PancakeImg}
                details={FOOD_TYPE_TO_STR[item.type]}
                actionIcon={NextIcon}
                onClick={() => router.push(`/food/${item.id}`)}
                onActionClick={() => console.log('onClick')}
              />
            ),
        )}
      </StyledList>
    </>
  )
}

export default Food
