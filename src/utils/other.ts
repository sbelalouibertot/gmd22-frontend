import sample from 'lodash/sample'

export const random = () => sample([true, false])

type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T
export function truthy<T>(value: T): value is Truthy<T> {
  return !!value
}
