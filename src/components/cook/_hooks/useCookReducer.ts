import { Dispatch, useReducer } from 'react'

import { TCookState } from './useCookContext'

export type TCookAction =
  | {
      type: 'COOK_PREPARATION_COMPLETE_STEP'
      payload: { recipeId: string; completedStep: number }
    }
  | {
      type: 'COOK_POPULATE_RECIPES'
      payload: { recipes: TCookState['recipes'] }
    }
  | {
      type: 'COOK_PREPARATION_START' | 'COOK_PREPARATION_FINISH'
    }

const defaultState: TCookState = {
  startedAt: null,
  finishedAt: null,
  lastUpdate: null,
  isLoaded: false,
  recipes: [],
}

const cookReducer = (state: TCookState, action: TCookAction): TCookState => {
  console.log('cookReducer', action.type)
  switch (action.type) {
    case 'COOK_PREPARATION_COMPLETE_STEP':
      const newState = { ...state }
      const { recipeId, completedStep } = action.payload ?? {}

      const recipeIndex = newState.recipes.findIndex(recipe => recipe.id === recipeId)

      if (recipeIndex === -1) {
        return state
      }
      newState.recipes[recipeIndex].currentInstructionIndex = completedStep + 1
      return { ...newState, lastUpdate: new Date() }

    case 'COOK_POPULATE_RECIPES':
      return {
        ...state,
        recipes: action.payload.recipes.map(recipe => ({ ...recipe, currentInstructionIndex: 0 })),
        isLoaded: true,
      }

    case 'COOK_PREPARATION_START':
      return { ...state, startedAt: new Date(), lastUpdate: new Date() }

    case 'COOK_PREPARATION_FINISH':
      return { ...state, finishedAt: new Date(), lastUpdate: new Date() }

    default:
      return state
  }
}

export const useCookReducer = (): [TCookState, Dispatch<TCookAction>] => {
  const [cookPreparationState, cookPreparationDispatch] = useReducer(cookReducer, defaultState)
  return [cookPreparationState, cookPreparationDispatch]
}
