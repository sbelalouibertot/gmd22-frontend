import '../styles/globals.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'

import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'

import { theme } from '@src/styles/design-system/theme'
import { getApolloClient } from '@src/utils/libs/apollo/client'

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = getApolloClient()

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>GMD 22</title>
        <meta name="description" content="Créé par Samy Belaloui-Bertot" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <Script
          src="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap"
          strategy="lazyOnload"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <DndProvider backend={TouchBackend}>
          <Component {...pageProps} />
        </DndProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
