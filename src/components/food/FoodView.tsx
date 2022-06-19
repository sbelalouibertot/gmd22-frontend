import { useDeleteFoodItemMutation, useFoodItemsQuery } from 'generated/gmd22-api'
import { FC } from 'react'

import foodItemsQuery from './_hooks/graphql/foodItems.graphql'
import { StyledFoodList, StyledFoodView } from './FoodView.styled'

const FoodView: FC = () => {
  const { loading: queryLoading, data: queryData } = useFoodItemsQuery()
  const [mutate, { loading: deleteLoading }] = useDeleteFoodItemMutation({
    refetchQueries: [{ query: foodItemsQuery, variables: {} }],
  })

  const loading = queryLoading || deleteLoading

  return (
    <StyledFoodView>
      <StyledFoodList>
        {loading
          ? 'Loading...'
          : queryData?.foodItems?.foodItems.map(({ id, name, type }) => (
              <li key={id}>
                {name} - {type}{' '}
                <button onClick={() => !!id && mutate({ variables: { id } })}>Supprimer</button>
              </li>
            ))}
      </StyledFoodList>
    </StyledFoodView>
  )
}

export default FoodView
