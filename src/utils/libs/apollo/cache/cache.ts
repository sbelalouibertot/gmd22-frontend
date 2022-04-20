import { defaultDataIdFromObject, InMemoryCache } from '@apollo/client'

import {
  ICompany,
  IInterventionEvaluation,
  ILandlordOnboarding,
  IUnpaidProcedureExternalAction,
  IUnpaidProcedureSchedule,
} from '@src/generated/bellman-api'

import typePolicies from './typePolicies'

const cache = new InMemoryCache({
  typePolicies,
  dataIdFromObject(object) {
    switch (object.__typename) {
      case 'InterventionEvaluation':
        return `InterventionEvaluation:${(object as IInterventionEvaluation).interventionId}`
      case 'Company':
        return `Company:${(object as ICompany).companyId}`
      case 'LandlordOnboarding':
        return `LandlordOnboarding:${(object as ILandlordOnboarding).landlordId}`
      case 'UnpaidProcedure':
        return `UnpaidProcedure:${(object as IUnpaidProcedureSchedule).unpaidProcedureId}`
      case 'UnpaidProcedureExternalAction':
        return `UnpaidProcedureExternalAction:${
          (object as IUnpaidProcedureExternalAction).externalActionId
        }`
      case 'UnpaidProcedureSchedule':
        return `UnpaidProcedureSchedule:${
          (object as IUnpaidProcedureSchedule).unpaidProcedureScheduleId
        }`

      default:
        return defaultDataIdFromObject(object)
    }
  },
})

export default cache
