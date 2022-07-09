import 'dayjs/locale/fr'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { MAX_EVENT_HOURS_DURATION } from '@src/constants/events'

dayjs.extend(utc)
dayjs.locale('fr')

export const isPastEvent = (date: Date | string): boolean =>
  dayjs.utc(new Date()).diff(dayjs.utc(date), 'hours') > MAX_EVENT_HOURS_DURATION

export const getDiffDateDetails = (date: Date | string): string => {
  const daysDifference = dayjs
    .utc(dayjs.utc(date).startOf('day'))
    .diff(dayjs.utc(new Date()).startOf('day'), 'days')

  if (daysDifference < -1) {
    return `Il y a ${daysDifference} jours`
  }
  if (daysDifference === -1) {
    return `Hier`
  }
  if (daysDifference === 0) {
    return `Aujourd'hui`
  }
  if (daysDifference === 1) {
    return `Demain`
  }
  if (daysDifference > 1) {
    return `Dans ${daysDifference} jours`
  } else {
    return 'Date inconnue'
  }
}

export const getStartOfDay = (date: Date | string = new Date()): Date =>
  dayjs
    .utc(date)
    .startOf('day')
    .toDate()

export const generateDays = (
  startDate: Date | string,
  endDate: Date | string,
  maxDaysNb = 60,
): { date: Date }[] => {
  const _startDate = dayjs.utc(startDate)
  const daysNb = Math.abs(_startDate.diff(endDate, 'days')) + 1

  if (!daysNb || daysNb > maxDaysNb) {
    return []
  }
  const days = [...Array(daysNb).keys()].map(dayIndex => {
    return {
      date: _startDate.add(dayIndex, 'days').toDate(),
    }
  })
  return days
}

export const isToday = (date: Date | string) => dayjs.utc(date).isSame(new Date(), 'day')
