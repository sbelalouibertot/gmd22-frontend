import router from 'next/router'
import { FC, useEffect, useState } from 'react'

import UnknownImg from '@src/../public/img/unknown.jpeg'
import { QUERY_DEBOUNCE_DURATION } from '@src/constants/common'
import { useRecipesQuery } from '@src/generated/gmd22-api'
import { useDebounce } from '@src/utils/hooks/useDebounce'
import { initSkeletons } from '@src/utils/skeletons'

import { Div } from '../common/div/Div.styled'
import { Input } from '../common/input/Input.styled'
import ListItem, { ListItemLoading } from '../common/list/ListItem'
import { Header } from '../header/Header'
import { StyledList } from './Recipes.styled'

const recipesSkeletons = initSkeletons(5)

const AllRecipes: FC = () => {
  const { loading, data, refetch } = useRecipesQuery()
  const recipes = data?.recipes?.recipes

  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const debouncedQuery = useDebounce(searchQuery, QUERY_DEBOUNCE_DURATION)

  useEffect(() => {
    if (!!debouncedQuery) {
      refetch({ filters: { searchQuery: debouncedQuery } })
      return
    }
    refetch({ filters: {} })
  }, [debouncedQuery, refetch])

  return (
    <>
      <Header title="Recettes" />
      <Div fullWidth>
        <Input
          placeholder="Filtrer par nom ou aliment"
          value={searchQuery || ''}
          onChange={e => setSearchQuery(e.currentTarget.value || undefined)}
        />
      </Div>
      <StyledList>
        {loading
          ? recipesSkeletons.map(id => <ListItemLoading key={id} />)
          : recipes?.map(
              recipe =>
                !!recipe && (
                  <ListItem
                    key={recipe.id}
                    title={recipe.name.length > 42 ? `${recipe.name.slice(0, 42)}...` : recipe.name}
                    avatar={recipe.image ?? UnknownImg}
                    details={`👨‍🍳 ${recipe.preparationDuration} min • 🔥 ${recipe.cookingDuration} min`}
                    onClick={() => {
                      if (!!recipe.id) {
                        router.push(`/recipes/${recipe.id}`)
                      }
                    }}
                  />
                ),
            )}
      </StyledList>
    </>
  )
}

export default AllRecipes
