import '../styles/globals.css'

import { AppProps } from 'next/app'
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
      <ApolloProvider client={apolloClient}>
        <DndProvider backend={TouchBackend}>
          <Component {...pageProps} />
        </DndProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
