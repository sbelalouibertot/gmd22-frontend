import dayjs from 'dayjs'
import pick from 'lodash/pick'
import Image from 'next/image'
import router from 'next/router'
import { FC, useMemo } from 'react'

import { USER_PREFERENCES_LABELS } from '@src/constants/userPreferences'
import {
  ICurrentPeriodEventsQueryData,
  INextRecipeEventQueryData,
  IRecipe,
  useCurrentPeriodEventsQuery,
  useNextRecipeEventQuery,
  useUserPreferencesQuery,
} from '@src/generated/gmd22-api'

import { Div } from '../common/div/Div.styled'
import EventCard from '../common/event-card/EventCard'
import List from '../common/list/List'
import MainRecipeCard from '../common/main-recipe-card/MainRecipeCard'
import Section from '../common/section/Section'
import Text from '../common/text/Text'

const formatNextRecipe = (
  nextRecipeEventData?: INextRecipeEventQueryData,
): Pick<IRecipe, 'id' | 'name' | 'preparationDuration' | 'cookingDuration'> | null => {
  const nextRecipes = nextRecipeEventData?.nextEvent?.event?.recipes
  if (!!nextRecipes && nextRecipes.length > 0) {
    return pick(nextRecipes[0], ['id', 'name', 'preparationDuration', 'cookingDuration'])
  } else {
    return null
  }
}

const formatCurrentPeriodEvents = (
  currentPeriodEventsData: ICurrentPeriodEventsQueryData | undefined,
) => {
  const currentPeriodEvents = currentPeriodEventsData?.events?.events
  if (!currentPeriodEventsData) {
    return []
  }
  return currentPeriodEvents?.filter(
    event => !!event?.type && !['PERIOD_START'].includes(event.type),
  )
}

const Home: FC = () => {
  const { loading: nextRecipeEventLoading, data: nextRecipeEventData } = useNextRecipeEventQuery()
  const nextRecipe = formatNextRecipe(nextRecipeEventData)

  const {
    /*loading: currentPeriodEventsLoading, */ data: currentPeriodEventsData,
  } = useCurrentPeriodEventsQuery()
  const currentPeriodEvents = formatCurrentPeriodEvents(currentPeriodEventsData)

  const {
    /*loading: userPreferencesLoading, */ data: userPreferencesData,
  } = useUserPreferencesQuery()
  const userPreferences = userPreferencesData?.userPreferences?.userPreferences

  const dayName = useMemo(() => dayjs.utc().format('dddd'), [])

  return (
    <>
      <Div row spaceBetween fullWidth>
        <Div row center gap="large">
          <Image src="/img/icons/sun.svg" height={20} width={20} />
          <Text firstLetterUppercase>{dayName}</Text>
        </Div>
        <Image src="/img/icons/alert.svg" height={25} width={25} />
      </Div>
      <Div spaceBetween fullWidth>
        <Text weight="bold" size="regular">
          😎 Samy
        </Text>
      </Div>
      <MainRecipeCard
        title="Prochaine recette"
        recipe={nextRecipe}
        loading={nextRecipeEventLoading}
        onClick={() => {
          if (!!nextRecipe?.id) {
            router.push(`/recipes/${nextRecipe.id}`)
          }
        }}
      />
      <Section title="Avancement" action="Voir plus">
        <List horizontal forceScrollVisibility verticalPadding>
          {currentPeriodEvents?.map(event => !!event && <EventCard key={event.id} event={event} />)}
        </List>
      </Section>
      <Section title="Préférences">
        <List verticalPadding>
          {userPreferences?.map(
            preference =>
              !!preference?.type && (
                <Div key={preference.id} row spaceBetween>
                  <Text>{USER_PREFERENCES_LABELS[preference.type]}</Text>
                  <Text weight="bold">{preference.value}</Text>
                </Div>
              ),
          )}
        </List>
      </Section>
    </>
  )
}

export default Home
