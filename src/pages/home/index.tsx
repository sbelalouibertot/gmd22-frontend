import { Page } from 'utils/libs/nextjs/types'

import currentPeriodEventsQuery from '@src/components/home/_hooks/currentPeriodEvents.graphql'
import nextRecipeEventQuery from '@src/components/home/_hooks/nextEvent.graphql'
import userPreferencesQuery from '@src/components/home/_hooks/userPreferences.graphql'
import Home from '@src/components/home/Home'
import {
  ICurrentPeriodEventsQueryData,
  INextRecipeEventQueryData,
  IUserPreferencesQueryData,
} from '@src/generated/gmd22-api'
import { MainLayout } from '@src/layouts/main'
import { getApolloClient } from '@src/utils/libs/apollo/client'

export type TStaticHomeProps = {
  nextRecipeEventData: INextRecipeEventQueryData
  currentPeriodEventsData: ICurrentPeriodEventsQueryData
  userPreferencesData: IUserPreferencesQueryData
  lastUpdate: Date
}

const HomeContainer: Page<TStaticHomeProps> = props => {
  return (
    <MainLayout>
      <Home {...props} />
    </MainLayout>
  )
}

HomeContainer.Layout = MainLayout

export const getStaticProps = async () => {
  const apolloClient = getApolloClient()

  const nextRecipeEventResults: { data: INextRecipeEventQueryData } = await apolloClient.query({
    query: nextRecipeEventQuery,
  })

  const currentPeriodEventsResults: {
    data: ICurrentPeriodEventsQueryData
  } = await apolloClient.query({
    query: currentPeriodEventsQuery,
  })

  const userPreferencesResults: {
    data: IUserPreferencesQueryData
  } = await apolloClient.query({
    query: userPreferencesQuery,
  })

  return {
    props: {
      nextRecipeEventData: nextRecipeEventResults.data,
      currentPeriodEventsData: currentPeriodEventsResults.data,
      userPreferencesData: userPreferencesResults.data,
      lastUpdate: new Date().toISOString(),
    },
    revalidate: 3600,
  }
}

export default HomeContainer
