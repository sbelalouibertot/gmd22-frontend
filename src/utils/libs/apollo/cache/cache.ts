import { InMemoryCache } from '@apollo/client'

import typePolicies from './typePolicies'

const cache = new InMemoryCache({
  typePolicies,
})

export default cache
