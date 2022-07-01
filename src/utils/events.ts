import { COOK_EMOJIS } from '@src/constants/food'
import { PERIOD_END_EMOJIS, PERIOD_START_EMOJIS } from '@src/constants/periods'
import { SHOPPING_EMOJIS } from '@src/constants/shoppingList'
import { IEventType } from '@src/generated/gmd22-api'

export const getEventsMainEmoji = (eventTypes: IEventType[]): string | undefined => {
  if (eventTypes.includes('PREPARATION')) {
    return COOK_EMOJIS[0]
  }
  if (eventTypes.includes('SHOPPING')) {
    return SHOPPING_EMOJIS[0]
  }
  if (eventTypes.includes('PERIOD_START')) {
    return PERIOD_START_EMOJIS[0]
  }
  if (eventTypes.includes('PERIOD_END')) {
    return PERIOD_END_EMOJIS[0]
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
