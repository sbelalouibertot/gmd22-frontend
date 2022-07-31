import { groupBy, mapValues } from 'lodash'
import { FC, useMemo } from 'react'

import CheckboxIcon from '@src/../public/img/icons/checkbox.svg'
import CheckboxCompletedIcon from '@src/../public/img/icons/checkbox-completed.svg'
import UnknownImg from '@src/../public/img/unknown.jpeg'
import {
  useCurrentShoppingListEventQuery,
  useToggleCheckShoppingListFoodMutation,
} from '@src/generated/gmd22-api'
import { truthy } from '@src/utils/other'
import { initSkeletons } from '@src/utils/skeletons'

import ListItem, { ListItemLoading } from '../common/list/ListItem'
import Text from '../common/text/Text'
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

  const total = formattedShoppingListItems?.length ?? 0
  const title = currentShoppingList?.name || 'Liste de courses'

  if (loading) {
    return (
      <>
        <Header title={title} />
        <StyledList>
          {shoppingListItemSkeletons.map(id => (
            <ListItemLoading key={id} />
          ))}
        </StyledList>
      </>
    )
  }

  return (
    <>
      <Header title={title} />
      <Text color="text-lighter" size="very-small">
        {total} résultat{total > 1 && 's'}
      </Text>
      <StyledList>
        {formattedShoppingListItems?.map(
          item =>
            !!item?.food && (
              <ListItem
                key={item.food.id}
                title={item.food.name ?? ''}
                avatar={item.food.image ?? UnknownImg}
                details={item.quantities}
                actionIcon={item.isChecked ? CheckboxCompletedIcon : CheckboxIcon}
                {...(!!item?.food?.id && { linkTo: `/food/${item.food.id}` })}
                onActionClick={() => {
                  if (!!item.id) {
                    onListItemCheckboxClicked(item.id)
                  }
                }}
              />
            ),
        )}
      </StyledList>
    </>
  )
}

export default ShoppingList
