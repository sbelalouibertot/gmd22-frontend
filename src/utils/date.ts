import 'dayjs/locale/fr'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { MAX_EVENT_HOURS_DURATION } from '@src/constants/events'

dayjs.extend(utc)
dayjs.locale('fr')

export const isPastEvent = (date: Date | string): boolean =>
  dayjs.utc(new Date()).diff(dayjs.utc(date), 'hours') > MAX_EVENT_HOURS_DURATION

export const getDiffDateDetails = (date: Date | string): string => {
  const daysDifference = dayjs.utc(dayjs.utc(date)).diff(new Date(), 'days')
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
