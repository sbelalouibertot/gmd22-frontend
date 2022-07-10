import router from 'next/router'
import { FC } from 'react'

import CheckboxIcon from '@src/../public/img/icons/checkbox.svg'
import CheckboxCompletedIcon from '@src/../public/img/icons/checkbox-completed.svg'
import PancakeImg from '@src/../public/img/pancake.jpeg'
import {
  useCurrentShoppingListEventQuery,
  useToggleCheckShoppingListFoodMutation,
} from '@src/generated/gmd22-api'
import { truthy } from '@src/utils/other'
import { initSkeletons } from '@src/utils/skeletons'

import ListItem, { ListItemLoading } from '../common/list/ListItem'
import { Header } from '../header/Header'
import { StyledList } from './ShoppingList.styled'

const shoppingListItemSkeletons = initSkeletons(6)

const ShoppingList: FC = () => {
  const { loading, data } = useCurrentShoppingListEventQuery()
  const currentShoppingList = data?.events?.events?.[0]?.shoppingList

  const [toggleCheckShoppingListFood] = useToggleCheckShoppingListFoodMutation()

  const onListItemCheckboxClicked = (itemId: string) => {
    toggleCheckShoppingListFood({ variables: { toggleCheckShoppingListFoodId: itemId } })
  }

  console.log({ currentShoppingList })

  return (
    <>
      <Header title={currentShoppingList?.name || 'Liste de courses'} />
      <StyledList>
        {loading
          ? shoppingListItemSkeletons.map(id => <ListItemLoading key={id} />)
          : currentShoppingList?.shoppingListItems?.map(
              item =>
                !!item?.food && (
                  <ListItem
                    key={item.food.id}
                    title={item.food.name ?? ''}
                    avatar={PancakeImg}
                    details={`${item.food.currentRecipeFoodItems
                      ?.map(foodItem =>
                        [foodItem?.quantity, foodItem?.quantityUnit].filter(truthy).join(' '),
                      )
                      .join(' et ')}`}
                    actionIcon={item.isChecked ? CheckboxCompletedIcon : CheckboxIcon}
                    onClick={() => {
                      if (!!item?.food?.id) {
                        router.push(`/food/${item.food.id}`)
                      }
                    }}
                    onActionClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                      if (!!item.id) {
                        onListItemCheckboxClicked(item.id)
                      }
                      e.stopPropagation()
                    }}
                  />
                ),
            )}
      </StyledList>
    </>
  )
}

export default ShoppingList
