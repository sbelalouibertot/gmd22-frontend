import router from 'next/router'
import { FC } from 'react'

import ChangeIcon from '@src/../public/img/icons/change.svg'
import PancakeImg from '@src/../public/img/pancake.jpeg'
import {
  useCurrentPeriodRecipeEventsQuery,
  useReplaceRecipeMutation,
} from '@src/generated/gmd22-api'
import { initSkeletons } from '@src/utils/skeletons'

import ListItem, { ListItemLoading } from '../common/list/ListItem'
import { Header } from '../header/Header'
import * as currentPeriodRecipeEventsQuery from './_hooks/currentPeriodRecipeEvents.graphql'
import { StyledList } from './Recipes.styled'

const recipesSkeletons = initSkeletons(5)

const Recipes: FC = () => {
  const { loading, data } = useCurrentPeriodRecipeEventsQuery()
  const recipes = data?.events?.events?.flatMap(event =>
    event?.recipes?.map(recipe => ({ ...recipe, eventId: event.id })),
  )
  const [replaceRecipe] = useReplaceRecipeMutation({
    refetchQueries: [{ query: currentPeriodRecipeEventsQuery }],
  })

  const onListItemClicked = ({ recipeId, eventId }: { recipeId: string; eventId: string }) => {
    replaceRecipe({ variables: { recipeId, eventId } })
  }

  return (
    <>
      <Header title="Recettes" />
      <StyledList>
        {loading
          ? recipesSkeletons.map(id => <ListItemLoading key={id} />)
          : recipes?.map(
              recipe =>
                !!recipe && (
                  <ListItem
                    key={recipe.id}
                    title={recipe.name ?? ''}
                    avatar={PancakeImg}
                    details={`👨‍🍳 ${recipe.preparationDuration} min • 🔥 ${recipe.cookingDuration} min`}
                    actionIcon={ChangeIcon}
                    onClick={() => {
                      if (!!recipe.id) {
                        router.push(`/recipes/${recipe.id}`)
                      }
                    }}
                    onActionClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                      if (!!recipe.id && !!recipe.eventId) {
                        onListItemClicked({ recipeId: recipe.id, eventId: recipe.eventId })
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

export default Recipes
