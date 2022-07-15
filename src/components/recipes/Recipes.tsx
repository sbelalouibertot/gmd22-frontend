import { FC } from 'react'

import ChangeIcon from '@src/../public/img/icons/change.svg'
import UnknownImg from '@src/../public/img/unknown.jpeg'
import Link from '@src/components/common/link/Link'
import {
  useCurrentPeriodRecipeEventsQuery,
  useReplaceRecipeMutation,
} from '@src/generated/gmd22-api'
import { initSkeletons } from '@src/utils/skeletons'

import { Div } from '../common/div/Div.styled'
import ListItem, { ListItemLoading } from '../common/list/ListItem'
import Text from '../common/text/Text'
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
      <Div fullWidth>
        <Text color="primary" align="right" size="small">
          <Link href={'/recipes/all'}>Voir toutes les recettes </Link>
        </Text>
      </Div>
      <StyledList>
        {loading
          ? recipesSkeletons.map(id => <ListItemLoading key={id} />)
          : recipes?.map(
              recipe =>
                !!recipe && (
                  <ListItem
                    key={recipe.id}
                    title={recipe.name.length > 42 ? `${recipe.name.slice(0, 41)}...` : recipe.name}
                    avatar={recipe.image ?? UnknownImg}
                    details={`👨‍🍳 ${recipe.preparationDuration} min • 🔥 ${recipe.cookingDuration} min`}
                    actionIcon={ChangeIcon}
                    {...(!!recipe.id && { linkTo: `/recipes/${recipe.id}` })}
                    onActionClick={() => {
                      if (!!recipe.id && !!recipe.eventId) {
                        onListItemClicked({ recipeId: recipe.id, eventId: recipe.eventId })
                      }
                    }}
                  />
                ),
            )}
      </StyledList>
    </>
  )
}

export default Recipes
