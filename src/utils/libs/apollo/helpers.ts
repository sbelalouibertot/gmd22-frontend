/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldPolicy } from '@apollo/client'

export const mergePaginatedEntities: FieldPolicy['merge'] = (existing, incoming, options) => {
  if (options.variables?.overrideCache) {
    return incoming
  }

  // Find array property name containing paginated items
  const fieldName = Object.keys(incoming).find(key => Array.isArray(incoming[key]))

  if (!fieldName) {
    return existing
  }

  // Prevent inconsistency between offset and cached entities
  if (
    existing?.[fieldName]?.length &&
    options.args?.pagination?.skip !== existing?.[fieldName]?.length
  ) {
    return existing
  }

  const initial = existing?.[fieldName]?.length ? [...existing?.[fieldName]] : []

  return {
    ...incoming,
    [fieldName]: [...initial, ...incoming[fieldName]],
  }
}

export const isSomeUndefined = (...args: any[]): boolean => {
  return args.some(item => item === undefined)
}
