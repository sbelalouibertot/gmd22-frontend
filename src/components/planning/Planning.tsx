import dayjs from 'dayjs'
import pick from 'lodash/pick'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import PancakeImg from '@src/../public/img/pancake.jpeg'
import { IDateEventsQueryData, useDateEventsQuery } from '@src/generated/gmd22-api'
import { generateDays, isToday } from '@src/utils/date'
import { getEventDescription, getEventsMainEmoji, getEventTitle } from '@src/utils/events'
import { initSkeletons } from '@src/utils/skeletons'

import { Div } from '../common/div/Div.styled'
import List from '../common/list/List'
import ListItem from '../common/list/ListItem'
import { Skeleton } from '../common/skeleton/Skeleton.styled'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { StyledRecipeItem, StyledRecipeItemContainer } from '../recipes/Recipes.styled'
import {
  StyledDayCard,
  StyledDayCardContainer,
  StyledEventsIndicator,
  StyledTimelineList,
} from './Planning.styled'

const daysSkeletons = initSkeletons(7)

type TDay = {
  date: Date
  dayName: string
  dayNumber: string
  isToday: boolean
  emoji?: string
  events: (IDateEventsQueryData['events']['events'][number] & {
    title?: string
    description?: string
  })[]
}

type TFormattedEvent = TDay['events'][number] & {
  formattedTime: string
}

const Planning: FC = () => {
  const router = useRouter()
  const routerDayIndex = router.query.dayIndex as string

  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null)
  const [selectedDayEvents, setSelectedDayEvents] = useState<TFormattedEvent[] | null>(null)
  const selectedDayRef = useRef<HTMLInputElement>(null)

  const { loading, data } = useDateEventsQuery()

  useEffect(() => {
    if (!isNaN(Number(routerDayIndex))) {
      setSelectedDayIndex(parseInt(routerDayIndex))
    }
  }, [router.query.dayIndex, routerDayIndex])

  const updateSelectedDay = useCallback(
    (dayIndex: number, options: { force: boolean } = { force: true }) => {
      if (options.force || (selectedDayIndex === null && routerDayIndex === undefined)) {
        setSelectedDayIndex(dayIndex)
        router.push(`/planning/${dayIndex}`)
      }
    },
    [router, routerDayIndex, selectedDayIndex],
  )

  const days: TDay[] = useMemo(() => {
    if (loading || !data?.events?.events) {
      return []
    }
    const _events = data.events.events
    const startEvent = _events?.find(event => event?.type === 'PERIOD_START')
    const endEvent = _events?.find(event => event?.type === 'PERIOD_END')

    if (!startEvent || !endEvent) {
      return []
    }
    const _days = generateDays(startEvent.date, endEvent.date).map(day => {
      const _date = dayjs.utc(day.date)
      const dayEvents = _events
        .filter(event => _date.isSame(event?.date, 'day'))
        .map(event => ({
          ...event,
          title: getEventTitle(event.type),
          description: getEventDescription(event.type),
        }))
      return {
        ...day,
        dayName: _date.format('ddd'),
        dayNumber: _date.format('DD'),
        isToday: isToday(day.date),
        emoji: getEventsMainEmoji(dayEvents.map(event => event.type)),
        events: dayEvents,
      }
    })

    return _days
  }, [data?.events.events, loading])

  useEffect(() => {
    if (!loading && !!data?.events?.events && !!days) {
      const dayIndex = days.findIndex(day => isToday(day.date))
      if (dayIndex !== -1) {
        updateSelectedDay(dayIndex, { force: false })
      }
    }
  }, [data?.events?.events, days, loading, updateSelectedDay])

  useEffect(() => {
    selectedDayRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })

    if (!!days && selectedDayIndex !== null && days.length > selectedDayIndex) {
      setSelectedDayEvents(
        days[selectedDayIndex].events.map(event => ({
          formattedTime: dayjs.utc(event.date).format('hh[h]mm'),
          ...pick(event, ['id', 'recipes', 'shoppingList', 'type', 'date', 'title', 'description']),
        })),
      )
    }
  }, [days, router, selectedDayIndex])

  if (loading) {
    return (
      <>
        <Header title="Planning" />
        <StyledDayCardContainer row gap="medium" flexStart>
          {daysSkeletons?.map(skeletonIndex => (
            <StyledDayCard key={`${skeletonIndex}`} center gap="small">
              <Skeleton width={36} />
              <Skeleton width={22} />
            </StyledDayCard>
          ))}
        </StyledDayCardContainer>
      </>
    )
  }

  return (
    <>
      <Header title="Planning" />
      <StyledDayCardContainer row gap="medium" flexStart>
        {days?.map((day, dayIndex) => (
          <StyledDayCard
            key={`day-${dayIndex}`}
            center
            isToday={day.isToday}
            isSelected={selectedDayIndex === dayIndex}
            {...(selectedDayIndex === dayIndex && { ref: selectedDayRef })}
            onClick={() => updateSelectedDay(dayIndex)}
          >
            {day.events.length > 0 && <StyledEventsIndicator>{day.emoji}</StyledEventsIndicator>}
            <Text size="small" weight={day.isToday ? 'bold' : 'light'} firstLetterUppercase>
              {day.dayName}
            </Text>
            <Text weight="medium">{day.dayNumber}</Text>
          </StyledDayCard>
        ))}
      </StyledDayCardContainer>
      <List>
        {selectedDayEvents?.map(event => (
          <Div key={event.id} gap="medium">
            {!event.description && <Text>{event.formattedTime}</Text>}
            {!!event.recipes && event.recipes.length > 0 && (
              <StyledTimelineList>
                {event.recipes.map((recipe, recipeIndex) => (
                  <Div key={recipe?.id} gap="small" row fullWidth center>
                    <StyledRecipeItemContainer flexStart>
                      <StyledRecipeItem>{recipeIndex + 1}</StyledRecipeItem>
                    </StyledRecipeItemContainer>
                    <ListItem
                      key={recipe.id}
                      small
                      title={recipe.name ?? ''}
                      avatar={PancakeImg}
                      details={`👨‍🍳 ${recipe.preparationDuration} min • 🔥 ${recipe.cookingDuration} min`}
                      onClick={() => {
                        if (!!recipe.id) {
                          router.push(`/recipes/${recipe.id}`)
                        }
                      }}
                    />
                  </Div>
                ))}
              </StyledTimelineList>
            )}
            {!!event.shoppingList && (
              <ListItem
                title={'Courses'}
                avatar={PancakeImg}
                details={event.shoppingList.name}
                onClick={() => router.push(`/shoppingList`)}
              />
            )}
            {!!event.title && !!event.description && (
              <ListItem title={event.title} avatar={PancakeImg} details={event.description} />
            )}
          </Div>
        ))}
      </List>
      {!loading && (!selectedDayEvents || selectedDayEvents.length === 0) && (
        <Div center>
          <Text size="very-big">😎</Text>
          <Text weight="light" color="text-lighter">
            Rien de prévu ce jour-là.
          </Text>
        </Div>
      )}
    </>
  )
}

export default Planning
