import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { getApolloClient } from '@src/utils/libs/apollo/client'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@src/utils/libs/emotion/Theme'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = getApolloClient()
  
  return <ThemeProvider theme={theme}><ApolloProvider client={apolloClient}><Component {...pageProps} /></ApolloProvider></ThemeProvider>
}

export default MyApp
