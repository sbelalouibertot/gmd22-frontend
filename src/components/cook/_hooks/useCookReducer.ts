import { Dispatch, useReducer } from 'react'

import { TCookState, TInstructionCompletionStatus } from './useCookContext'

export type TCookAction =
  | {
      type: 'COOK_PREPARATION_UPDATE_INSTRUCTION_COMPLETION_STATUS'
      payload: {
        recipeId: string
        instructionId: string
        completionStatus: TInstructionCompletionStatus
      }
    }
  | {
      type: 'COOK_POPULATE_RECIPES'
      payload: { recipes: TCookState['recipes'] }
    }
  | {
      type: 'COOK_UPDATE_STATE_FROM_LOCAL_STORAGE'
      payload: TCookState
    }
  | {
      type:
        | 'COOK_PREPARATION_START'
        | 'COOK_PREPARATION_RESTART'
        | 'COOK_PREPARATION_FINISH'
        | 'COOK_PREPARATION_PAUSE_STOP'
        | 'COOK_PREPARATION_PAUSE_START'
    }
  | {
      type: 'COOK_ADD_TIMER_TO_INSTRUCTION'
      payload: {
        instructionId: string
        timer: number
      }
    }

export const defaultState: TCookState = {
  startedAt: null,
  finishedAt: null,
  lastUpdate: null,
  isLoaded: false,
  recipes: [],
  pauses: [],
}

const cookReducer = (state: TCookState, action: TCookAction): TCookState => {
  console.log('cookReducer', action.type, new Date(), new Date().getMilliseconds())
  switch (action.type) {
    case 'COOK_PREPARATION_UPDATE_INSTRUCTION_COMPLETION_STATUS': {
      const newState = { ...state }
      const { recipeId, instructionId, completionStatus } = action.payload ?? {}

      const recipeIndex = newState.recipes.findIndex(recipe => recipe.id === recipeId)

      if (recipeIndex === -1) {
        return state
      }
      const instructionIndex = newState.recipes[recipeIndex].instructions.findIndex(
        instruction => instruction.id === instructionId,
      )
      if (instructionIndex === -1) {
        return state
      }
      const instruction = newState.recipes[recipeIndex].instructions[instructionIndex]
      instruction.completionStatus = completionStatus

      if (['DONE', 'NOT_STARTED'].includes(completionStatus)) {
        instruction.timer = undefined
        instruction.timerInitDate = undefined
      }

      return { ...newState, lastUpdate: new Date() }
    }

    case 'COOK_POPULATE_RECIPES': {
      return {
        ...state,
        recipes: action.payload.recipes,
        isLoaded: true,
      }
    }

    case 'COOK_PREPARATION_START': {
      return { ...state, startedAt: new Date(), lastUpdate: new Date() }
    }

    case 'COOK_PREPARATION_RESTART': {
      localStorage.removeItem('cookPreparationState')
      return defaultState
    }

    case 'COOK_PREPARATION_FINISH': {
      return { ...state, finishedAt: new Date(), lastUpdate: new Date() }
    }

    case 'COOK_PREPARATION_PAUSE_START': {
      const pauses = state.pauses
      pauses.push({ startTime: new Date(), endTime: null })
      return { ...state, pauses, lastUpdate: new Date() }
    }

    case 'COOK_PREPARATION_PAUSE_STOP': {
      const _pauses = state.pauses
      _pauses[_pauses.length - 1].endTime = new Date()
      return { ...state, pauses: _pauses, lastUpdate: new Date() }
    }

    case 'COOK_UPDATE_STATE_FROM_LOCAL_STORAGE': {
      return action.payload
    }

    case 'COOK_ADD_TIMER_TO_INSTRUCTION': {
      const newState = { ...state }
      const { instructionId, timer } = action.payload ?? {}

      const recipeIndex = newState.recipes.findIndex(recipe =>
        recipe.instructions.find(instruction => instruction.id === instructionId),
      )
      if (recipeIndex === -1) {
        return state
      }
      const instructionIndex = newState.recipes[recipeIndex].instructions.findIndex(
        instruction => instruction.id === instructionId,
      )
      if (instructionIndex === -1) {
        return state
      }
      newState.recipes[recipeIndex].instructions[instructionIndex].timer = timer
      newState.recipes[recipeIndex].instructions[instructionIndex].timerInitDate = new Date()
      return { ...newState, lastUpdate: new Date() }
    }

    default:
      return state
  }
}

export const useCookReducer = (): [TCookState, Dispatch<TCookAction>] => {
  const [cookPreparationState, cookPreparationDispatch] = useReducer(cookReducer, defaultState)
  return [cookPreparationState, cookPreparationDispatch]
}
