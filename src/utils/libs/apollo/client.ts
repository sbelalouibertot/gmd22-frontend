/**
 * Based on official implementation with next, but without ssr support
 * https://github.com/vercel/next.js/blob/master/examples/with-apollo/lib/apolloClient.js
 **/

import { ApolloClient, from } from '@apollo/client'

import packageInfo from '../../../../package.json'
import cache from './cache'

let client: ApolloClient<unknown> | undefined = undefined

export const getApolloClient = (): ApolloClient<unknown> => {
  if (!client) {
    client = new ApolloClient({
      uri: process.env.NODE_ENV === 'production' ? 'http://77.192.114.110:4000' : 'http://localhost:4000',
      ssrMode: false,
      cache,
      name: packageInfo.name,
      version: packageInfo.version,
    })
  }

  return client
}