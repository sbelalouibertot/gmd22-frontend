import dayjs from 'dayjs'
import pick from 'lodash/pick'
import Image from 'next/image'
import { FC, useMemo } from 'react'

import AlertIcon from '@src/../public/img/icons/alert.svg'
import SunIcon from '@src/../public/img/icons/sun.svg'
import Link from '@src/components/common/link/Link'
import { USER_PREFERENCES_LABELS } from '@src/constants/userPreferences'
import {
  ICurrentPeriodEventsQueryData,
  INextRecipeEventQueryData,
  IRecipe,
  useCurrentPeriodEventsQuery,
  useNextRecipeEventQuery,
  useUserPreferencesQuery,
} from '@src/generated/gmd22-api'
import { initSkeletons } from '@src/utils/skeletons'

import AnimatedButtonWrapper from '../common/animations/AnimatedButtonWrapper'
import { Div } from '../common/div/Div.styled'
import EventCard, { EventCardLoading } from '../common/event-card/EventCard'
import List from '../common/list/List'
import MainRecipeCard from '../common/main-recipe-card/MainRecipeCard'
import Section from '../common/section/Section'
import { Skeleton } from '../common/skeleton/Skeleton.styled'
import Text from '../common/text/Text'

const eventsCardsSkeletons = initSkeletons(3)
const preferencesSkeletons = initSkeletons(2)

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
    loading: currentPeriodEventsLoading,
    data: currentPeriodEventsData,
  } = useCurrentPeriodEventsQuery()
  const currentPeriodEvents = formatCurrentPeriodEvents(currentPeriodEventsData)

  const { loading: userPreferencesLoading, data: userPreferencesData } = useUserPreferencesQuery()
  const userPreferences = userPreferencesData?.userPreferences?.userPreferences

  const dayName = useMemo(
    () =>
      dayjs
        .utc()
        .add(2, 'hours') // Local time
        .format('dddd'),
    [],
  )

  return (
    <>
      <Div row spaceBetween fullWidth>
        <Div row center gap="large">
          <Image src={SunIcon} height={20} width={20} alt="Sun" />
          <Text firstLetterUppercase>{dayName}</Text>
        </Div>
        <Image src={AlertIcon} height={25} width={25} alt="Alert" />
      </Div>
      <AnimatedButtonWrapper>
        <Link {...(!!nextRecipe?.id && { href: `/recipes/${nextRecipe.id}` })}>
          <MainRecipeCard
            title="Prochaine recette"
            recipe={nextRecipe}
            loading={nextRecipeEventLoading}
          />
        </Link>
      </AnimatedButtonWrapper>
      <Section title="Avancement" action={<Link href="/planning">Voir plus</Link>}>
        <List horizontal forceScrollVisibility verticalPadding>
          {currentPeriodEventsLoading
            ? eventsCardsSkeletons.map(id => <EventCardLoading key={id} index={id} />)
            : currentPeriodEvents?.map(
                event =>
                  !!event && (
                    <Link key={event.id} href={`/planning/event/${event.id}`}>
                      <EventCard event={event} />
                    </Link>
                  ),
              )}
        </List>
      </Section>
      <Section title="Préférences">
        <List verticalPadding gap="small">
          {userPreferencesLoading
            ? preferencesSkeletons.map(id => (
                <Div key={id} row spaceBetween>
                  <Div row gap="small">
                    <Skeleton width={20} />
                    <Skeleton width={150} />
                  </Div>
                  <Skeleton width={35} />
                </Div>
              ))
            : userPreferences?.map(
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
