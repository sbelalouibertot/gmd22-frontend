import dayjs from 'dayjs'
import pick from 'lodash/pick'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDragLayer } from 'react-dnd'

import PancakeImg from '@src/../public/img/pancake.jpeg'
import {
  IDateEventsQueryData,
  useDateEventsQuery,
  useUpdateEventDateMutation,
} from '@src/generated/gmd22-api'
import { generateDays, isToday } from '@src/utils/date'
import { getEventDescription, getEventsMainEmoji, getEventTitle } from '@src/utils/events'
import { initSkeletons } from '@src/utils/skeletons'

import AnimatedButtonWrapper from '../common/animations/AnimatedButtonWrapper'
import { Div } from '../common/div/Div.styled'
import { StyledIndicator } from '../common/div/Indicator.styled'
import Link from '../common/link/Link'
import List from '../common/list/List'
import ListItem from '../common/list/ListItem'
import { Skeleton } from '../common/skeleton/Skeleton.styled'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { StyledRecipeItem, StyledRecipeItemContainer } from '../recipes/Recipes.styled'
import * as dateEventsQuery from './_hooks/dateEvents.graphql'
import DraggableDayEvent from './DraggableDayEvent'
import DroppableDayCard from './DroppableDayCard'
import { StyledDayCard, StyledDayCardContainer, StyledTimelineList } from './Planning.styled'

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
  const routerEventId = router.query.eventId as string

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
        if (!routerEventId) {
          router.push(`/planning/${dayIndex}`)
        }
      }
    },
    [router, routerDayIndex, routerEventId, selectedDayIndex],
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
      const dayIndex = days.findIndex(day =>
        !!routerEventId ? day.events.find(event => event.id === routerEventId) : isToday(day.date),
      )
      if (dayIndex !== -1) {
        updateSelectedDay(dayIndex, { force: false })
      }
    }
  }, [data?.events?.events, days, loading, routerEventId, updateSelectedDay])

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

  const isDragging = useDragLayer(monitor => monitor.isDragging())

  const [updateEventDate] = useUpdateEventDateMutation({
    refetchQueries: [{ query: dateEventsQuery }],
  })

  const onUpdateEventDate = ({ date, id }: { date: Date; id: string }) => {
    updateEventDate({ variables: { updateEventDateId: id, date } })
    const dayIndex = days.findIndex(day => dayjs.utc(day.date).isSame(date, 'day'))
    if (dayIndex < 0) {
      return
    }
    updateSelectedDay(dayIndex)
  }

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
          <AnimatedButtonWrapper key={dayIndex}>
            <Link
              href={`/planning/${dayIndex}`}
              {...(selectedDayIndex === dayIndex && { ref: selectedDayRef })}
            >
              <DroppableDayCard
                center
                isToday={day.isToday}
                isSelected={selectedDayIndex === dayIndex}
                onClick={() => {
                  updateSelectedDay(dayIndex)
                }}
                isDropTargetDisplayed={isDragging}
                date={day.date}
              >
                {day.events.length > 0 && <StyledIndicator>{day.emoji}</StyledIndicator>}
                <Text size="small" weight={day.isToday ? 'bold' : 'light'} firstLetterUppercase>
                  {day.dayName}
                </Text>
                <Text weight="medium">{day.dayNumber}</Text>
              </DroppableDayCard>
            </Link>
          </AnimatedButtonWrapper>
        ))}
      </StyledDayCardContainer>
      <List>
        {selectedDayEvents?.map(event => (
          <Div key={event.id} gap="medium">
            {!event.description && (
              <DraggableDayEvent
                formattedTime={event.formattedTime}
                id={event.id}
                onUpdateEventDate={onUpdateEventDate}
              />
            )}
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
                      {...(!!recipe.id && { linkTo: `/recipes/${recipe.id}` })}
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
                linkTo={`/shoppingList`}
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
