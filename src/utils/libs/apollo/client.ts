/**
 * Based on official implementation with next, but without ssr support
 * https://github.com/vercel/next.js/blob/master/examples/with-apollo/lib/apolloClient.js
 **/

import { env } from 'utils/libs/nextjs/config'

import { ApolloClient } from '@apollo/client'

import packageInfo from '../../../../package.json'
import cache from './cache'
const client: ApolloClient<unknown> | undefined = undefined

export const getApolloClient = (): ApolloClient<unknown> =>
  client ??
  new ApolloClient({
    uri:
      process.env.NODE_ENV === 'production'
        ? `http://${env.PRODUCTION_HOST_IP}:${env.PRODUCTION_API_PORT}`
        : 'http://192.168.0.23:4000',
    ssrMode: false,
    cache,
    name: packageInfo.name,
    version: packageInfo.version,
  })
