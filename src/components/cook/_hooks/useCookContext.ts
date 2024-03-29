import { createContext, Dispatch, useContext } from 'react'

import { TCookAction } from './useCookReducer'

export type TInstructionCompletionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE'

export type TCookState = {
  startedAt: Date | null
  finishedAt: Date | null
  lastUpdate: Date | null
  isLoaded: boolean
  recipes: {
    id: string
    name: string
    instructions: {
      id: string
      description: string
      completionStatus: TInstructionCompletionStatus
      timer?: number
      timerInitDate?: Date
    }[]
    preparationDuration: number
    cookingDuration: number
  }[]
  pauses: {
    startTime: Date | null
    endTime: Date | null
  }[]
}

export type TCookContext = {
  cookPreparationDispatch: Dispatch<TCookAction>
  cookPreparationState: TCookState
}

export const CookContext = createContext({} as TCookContext)

export const useCookContext = (): TCookContext => {
  const cookContextValue = useContext(CookContext)
  if (!cookContextValue) {
    throw Error('useCookContext must be used inside CookContextProvider')
  }
  return cookContextValue
}
