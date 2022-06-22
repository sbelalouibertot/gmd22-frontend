import router from 'next/router'
import { FC } from 'react'

import NextIcon from '@src/../public/img/icons/next.svg'
import PancakeImg from '@src/../public/img/pancake.jpeg'
import { useCurrentPeriodRecipeEventsQuery } from '@src/generated/gmd22-api'
import { initSkeletons } from '@src/utils/skeletons'

import ListItem, { ListItemLoading } from '../common/list/ListItem'
import { Header } from '../header/Header'
import { StyledList } from './Recipes.styled'

const recipesSkeletons = initSkeletons(5)

const Recipes: FC = () => {
  const { loading, data } = useCurrentPeriodRecipeEventsQuery()
  const recipes = data?.events?.events?.flatMap(event => event?.recipes)

  return (
    <>
      <Header title="Recettes" />
      <StyledList>
        {loading
          ? recipesSkeletons.map(id => <ListItemLoading key={id} />)
          : recipes?.map(
              recipe =>
                !!recipe?.name && (
                  <ListItem
                    key={recipe?.id}
                    title={recipe.name}
                    avatar={PancakeImg}
                    details={`👨‍🍳 ${recipe.preparationDuration} min • 🔥 ${recipe.cookingDuration} min`}
                    actionIcon={NextIcon}
                    onClick={() => {
                      if (!!recipe.id) {
                        router.push(`/recipes/${recipe.id}`)
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

export default Recipes
