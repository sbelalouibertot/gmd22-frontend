import { groupBy, mapValues } from 'lodash'
import router from 'next/router'
import { FC, useMemo } from 'react'

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
  const { loading, data } = useCurrentShoppingListEventQuery({ fetchPolicy: 'cache-and-network' })
  const currentShoppingList = data?.events?.events?.[0]?.shoppingList

  const [toggleCheckShoppingListFood] = useToggleCheckShoppingListFoodMutation()

  const onListItemCheckboxClicked = (itemId: string) => {
    toggleCheckShoppingListFood({ variables: { toggleCheckShoppingListFoodId: itemId } })
  }

  const formattedShoppingListItems = useMemo(
    () =>
      currentShoppingList?.shoppingListItems
        .map(shoppingListItem => {
          if (!shoppingListItem?.food) {
            return
          }
          const groupedItem = groupBy(shoppingListItem.food.currentRecipeFoodItems, 'quantityUnit')
          const quantitiesObject = mapValues(groupedItem, (v, quantityUnit) => {
            const quantity = v.reduce((acc, recipeFood) => acc + (recipeFood?.quantity ?? 0), 0)
            return quantityUnit === 'null'
              ? `${[
                  quantity,
                  Object.keys(groupedItem).length > 1 && `unité${quantity > 1 ? 's' : ''}`,
                ]
                  .filter(truthy)
                  .join(' ')}`
              : `${quantity} ${quantityUnit}`
          })
          const quantities = Object.values(quantitiesObject)
            .sort(x => (x.includes('unité') ? -1 : 1))
            .join(' et ')
          return { ...shoppingListItem, quantities }
        })
        .filter(truthy),
    [currentShoppingList?.shoppingListItems],
  )

  return (
    <>
      <Header title={currentShoppingList?.name || 'Liste de courses'} />
      <StyledList>
        {loading
          ? shoppingListItemSkeletons.map(id => <ListItemLoading key={id} />)
          : formattedShoppingListItems?.map(
              item =>
                !!item?.food && (
                  <ListItem
                    key={item.food.id}
                    title={item.food.name ?? ''}
                    avatar={PancakeImg}
                    details={item.quantities}
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
