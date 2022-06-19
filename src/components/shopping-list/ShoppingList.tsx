import Image from 'next/image'
import { FC } from 'react'

import { useCurrentShoppingListEventQuery } from '@src/generated/gmd22-api'

import { Div } from '../common/div/Div.styled'
import ListItem from '../common/list/ListItem'
import Text from '../common/text/Text'
import { StyledList } from './ShoppingList.styled'

const ShoppingList: FC = () => {
  const { /*loading,*/ data } = useCurrentShoppingListEventQuery()
  const currentShoppingList = data?.events?.events?.[0]?.shoppingList
  console.log({ currentShoppingList })
  return (
    <>
      <Div row spaceBetween fullWidth>
        <Image src="/img/icons/previous.svg" height={20} width={20} />
        <Text weight="bold">Liste de courses</Text>
        <Image src="/img/icons/edit.svg" height={25} width={25} />
      </Div>
      <StyledList>
        {currentShoppingList?.shoppingListItems?.map(
          item =>
            !!item?.food && (
              <ListItem
                key={item.food.id}
                title={item.food.name ?? ''}
                avatar={'/img/pancake.jpeg'}
                details={`-`}
                actionIconPath={`/img/icons/${
                  item.isChecked ? 'checkbox-completed' : 'checkbox'
                }.svg`}
                onActionClick={() => console.log('onClick')}
              />
            ),
        )}
      </StyledList>
    </>
  )
}

export default ShoppingList
