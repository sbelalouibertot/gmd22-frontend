import { IEventType } from '@src/generated/gmd22-api'

export const MAX_EVENT_HOURS_DURATION = 3

export const EVENT_TYPE_LABELS: Record<IEventType, string> = {
  PERIOD_START: 'Début du cycle',
  PERIOD_END: 'Fin du cycle',
  PREPARATION: 'Préparation',
  SHOPPING: 'Courses',
}

export const EVENT_TYPE_IMAGES: Record<IEventType, string | string[]> = {
  PERIOD_START: 'pancake.jpeg',
  PERIOD_END: 'pancake.jpeg',
  PREPARATION: ['pancake.jpeg', 'sandwich.jpeg'],
  SHOPPING: 'shopping-items.png',
}
