import Image from 'next/image'
import router from 'next/router'
import { FC } from 'react'

import CheckboxIcon from '@src/../public/img/icons/checkbox.svg'
import CheckboxCompletedIcon from '@src/../public/img/icons/checkbox-completed.svg'
import EditIcon from '@src/../public/img/icons/edit.svg'
import PreviousIcon from '@src/../public/img/icons/previous.svg'
import PancakeImg from '@src/../public/img/pancake.jpeg'
import { useCurrentShoppingListEventQuery } from '@src/generated/gmd22-api'

import { Div } from '../common/div/Div.styled'
import ListItem from '../common/list/ListItem'
import Text from '../common/text/Text'
import { StyledList } from './ShoppingList.styled'

const ShoppingList: FC = () => {
  const { /*loading,*/ data } = useCurrentShoppingListEventQuery()
  const currentShoppingList = data?.events?.events?.[0]?.shoppingList

  return (
    <>
      <Div row spaceBetween fullWidth>
        <Image src={PreviousIcon} height={20} width={20} />
        <Text weight="bold">Liste de courses</Text>
        <Image src={EditIcon} height={25} width={25} />
      </Div>
      <StyledList>
        {currentShoppingList?.shoppingListItems?.map(
          item =>
            !!item?.food && (
              <ListItem
                key={item.food.id}
                title={item.food.name ?? ''}
                avatar={PancakeImg}
                details={`-`}
                actionIcon={item.isChecked ? CheckboxCompletedIcon : CheckboxIcon}
                onClick={() => {
                  if (!!item?.food?.id) {
                    router.push(`/food/${item.food.id}`)
                  }
                }}
                onActionClick={() => console.log('onClick')}
              />
            ),
        )}
      </StyledList>
    </>
  )
}

export default ShoppingList
