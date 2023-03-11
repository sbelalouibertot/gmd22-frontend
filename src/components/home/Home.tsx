import dayjs from 'dayjs'
import pick from 'lodash/pick'
import Image, { ImageProps } from 'next/image'
import { FC, useMemo } from 'react'

import AlertIcon from '@src/../public/img/icons/alert.svg'
import SunIcon from '@src/../public/img/icons/sun.svg'
import Link from '@src/components/common/link/Link'
import { USER_PREFERENCES_LABELS } from '@src/constants/userPreferences'
import {
  ICurrentPeriodEventsQueryData,
  INextRecipeEventQueryData,
  IRecipe,
} from '@src/generated/gmd22-api'
import { TStaticHomeProps } from '@src/pages/home'

import AnimatedButtonWrapper from '../common/animations/AnimatedButtonWrapper'
import { Div } from '../common/div/Div.styled'
import EventCard from '../common/event-card/EventCard'
import List from '../common/list/List'
import MainRecipeCard from '../common/main-recipe-card/MainRecipeCard'
import Section from '../common/section/Section'
import Text from '../common/text/Text'

const _SunIcon = SunIcon as ImageProps['src']
const _AlertIcon = AlertIcon as ImageProps['src']

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

const Home: FC<TStaticHomeProps> = ({
  nextRecipeEventData,
  currentPeriodEventsData,
  userPreferencesData,
}) => {
  const nextRecipe = formatNextRecipe(nextRecipeEventData)
  const currentPeriodEvents = formatCurrentPeriodEvents(currentPeriodEventsData)
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
          <Image src={_SunIcon} height={20} width={20} alt="Sun" placeholder="empty" />
          <Text firstLetterUppercase>{dayName}</Text>
        </Div>
        <Image src={_AlertIcon} height={25} width={25} alt="Alert" placeholder="empty" />
      </Div>
      <AnimatedButtonWrapper>
        <Link {...(!!nextRecipe?.id && { href: `/recipes/${nextRecipe.id}` })}>
          <MainRecipeCard title="Prochaine recette" recipe={nextRecipe} />
        </Link>
      </AnimatedButtonWrapper>
      <Section title="Avancement" action={<Link href="/planning">Voir plus</Link>}>
        <List horizontal forceScrollVisibility verticalPadding>
          {currentPeriodEvents?.map(
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
