import { ReactNode, useEffect } from 'react'

import { useNextPreparationRecipesQuery } from '@src/generated/gmd22-api'
import { truthy } from '@src/utils/other'

import { CookContext, TCookState } from './_hooks/useCookContext'
import { defaultState, useCookReducer } from './_hooks/useCookReducer'

const CookContainer = ({ children }: { children?: ReactNode } = {}) => {
  const { loading, data } = useNextPreparationRecipesQuery()
  const recipes = data?.nextEvent?.event?.recipes

  const [cookPreparationState, cookPreparationDispatch] = useCookReducer()

  useEffect(() => {
    const localStorageState = localStorage.getItem('cookPreparationState')
    if (!localStorageState) {
      return
    }
    cookPreparationDispatch({
      type: 'COOK_UPDATE_STATE_FROM_LOCAL_STORAGE',
      payload: JSON.parse(localStorageState) as TCookState,
    })
  }, [cookPreparationDispatch])

  useEffect(() => {
    if (cookPreparationState !== defaultState) {
      localStorage.setItem('cookPreparationState', JSON.stringify(cookPreparationState))
    }
  }, [cookPreparationState])

  useEffect(() => {
    const localStorageState = localStorage.getItem('cookPreparationState')
    if (loading || !recipes || cookPreparationState.isLoaded || !!localStorageState) {
      return
    }
    cookPreparationDispatch({
      type: 'COOK_POPULATE_RECIPES',
      payload: {
        recipes: recipes.map(recipe => ({
          id: recipe.id,
          name: recipe.name,
          preparationDuration: recipe.preparationDuration,
          cookingDuration: recipe.cookingDuration,
          instructions:
            recipe.recipeInstructions?.filter(truthy).map(instruction => ({
              id: instruction.id,
              description: instruction?.description,
              completionStatus: 'NOT_STARTED',
            })) ?? [],
        })),
      },
    })
  }, [
    cookPreparationDispatch,
    cookPreparationState.isLoaded,
    cookPreparationState.recipes,
    loading,
    recipes,
  ])

  return (
    <CookContext.Provider value={{ cookPreparationState, cookPreparationDispatch }}>
      {children}
    </CookContext.Provider>
  )
}

export default CookContainer
