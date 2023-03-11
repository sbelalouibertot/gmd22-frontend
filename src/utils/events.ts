import { COOK_EMOJIS } from '@src/constants/food'
import { PERIOD_END_EMOJIS, PERIOD_START_EMOJIS } from '@src/constants/periods'
import { SHOPPING_EMOJIS } from '@src/constants/shoppingList'
import { IEventType } from '@src/generated/gmd22-api'

const eventsMainEmoji: Record<IEventType, string> = {
  PREPARATION: COOK_EMOJIS[0],
  SHOPPING: SHOPPING_EMOJIS[0],
  PERIOD_START: PERIOD_START_EMOJIS[0],
  PERIOD_END: PERIOD_END_EMOJIS[0],
}

export const getEventsMainEmoji = (eventTypes: IEventType[]): string | undefined => {
  const orderedEventsToMatch: IEventType[] = [
    'PREPARATION',
    'SHOPPING',
    'PERIOD_START',
    'PERIOD_END',
  ]

  for (const event of orderedEventsToMatch) {
    if (eventTypes.includes(event)) {
      return eventsMainEmoji[event]
    }
  }
}

export const getEventTitle = (eventType: IEventType): string | undefined => {
  switch (eventType) {
    case 'PERIOD_START':
      return 'Ça commence 🤫'
    case 'PERIOD_END':
      return "C'est terminé 🏆"
  }
  return
}

export const getEventDescription = (eventType: IEventType): string | undefined => {
  switch (eventType) {
    case 'PERIOD_START':
      return 'Dans les starting-blocks, chef.'
    case 'PERIOD_END':
      return 'Toutes les bonnes choses ont une fin.'
  }
  return
}
