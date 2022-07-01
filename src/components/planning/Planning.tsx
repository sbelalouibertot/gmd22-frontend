import dayjs from 'dayjs'
import pick from 'lodash/pick'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import PancakeImg from '@src/../public/img/pancake.jpeg'
import { IDateEventsQueryData, useDateEventsQuery } from '@src/generated/gmd22-api'
import { generateDays } from '@src/utils/date'

import { Div } from '../common/div/Div.styled'
import List from '../common/list/List'
import ListItem from '../common/list/ListItem'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { StyledRecipeItem, StyledRecipeItemContainer } from '../recipes/Recipes.styled'
import {
  StyledDayCard,
  StyledDayCardContainer,
  StyledEventsIndicator,
  StyledTimelineList,
} from './Planning.styled'

type TDay = {
  date: Date
  dayName: string
  dayNumber: string
  isToday: boolean
  events: IDateEventsQueryData['events']['events']
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
    const _days = generateDays(startEvent.date, endEvent.date).map((day, dayIndex) => {
      const _date = dayjs.utc(day.date)
      const isToday = _date.isSame(new Date(), 'day')

      if (isToday) {
        updateSelectedDay(dayIndex, { force: false })
      }
      return {
        ...day,
        dayName: _date.format('ddd'),
        dayNumber: _date.format('DD'),
        isToday,
        events: _events.filter(event => _date.isSame(event?.date, 'day')),
      }
    })

    return _days
  }, [data?.events?.events, loading, updateSelectedDay])

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
          ...pick(event, ['id', 'recipes', 'shoppingList', 'type', 'date']),
        })),
      )
    }
  }, [days, router, selectedDayIndex])

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
            {day.events.length > 0 && <StyledEventsIndicator />}
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
            <Text>{event.formattedTime}</Text>
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
          </Div>
        ))}
      </List>
    </>
  )
}

export default Planning
