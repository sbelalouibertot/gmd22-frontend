import { ReactNode, useEffect } from 'react'

import { useNextPreparationRecipesQuery } from '@src/generated/gmd22-api'
import { truthy } from '@src/utils/other'

import { CookContext } from './_hooks/useCookContext'
import { useCookReducer } from './_hooks/useCookReducer'

const CookContainer = ({ children }: { children?: ReactNode }) => {
  const { loading, data } = useNextPreparationRecipesQuery()
  const recipes = data?.nextEvent?.event?.recipes

  const [cookPreparationState, cookPreparationDispatch] = useCookReducer()

  useEffect(() => {
    if (!loading && !!recipes && !cookPreparationState.isLoaded) {
      cookPreparationDispatch({
        type: 'COOK_POPULATE_RECIPES',
        payload: {
          recipes: recipes.map(recipe => ({
            id: recipe.id,
            name: recipe.name,
            currentInstructionIndex: 0,
            preparationDuration: recipe.preparationDuration,
            cookingDuration: recipe.cookingDuration,
            instructions:
              recipe.recipeInstructions
                ?.map(
                  instruction =>
                    !!instruction && {
                      id: instruction.id,
                      description: instruction?.description,
                    },
                )
                .filter(truthy) ?? [],
          })),
        },
      })
    }
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
