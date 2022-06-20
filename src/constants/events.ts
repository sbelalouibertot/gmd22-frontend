import { StaticImageData } from 'next/image'

import PancakeImg from '@src/../public/img/pancake.jpeg'
import SandwichImg from '@src/../public/img/sandwich.jpeg'
import ShoppingItemsImg from '@src/../public/img/shopping-items.png'
import { IEventType } from '@src/generated/gmd22-api'

export const MAX_EVENT_HOURS_DURATION = 3

export const EVENT_TYPE_LABELS: Record<IEventType, string> = {
  PERIOD_START: 'Début du cycle',
  PERIOD_END: 'Fin du cycle',
  PREPARATION: 'Préparation',
  SHOPPING: 'Courses',
}

export const EVENT_TYPE_IMAGES: Record<IEventType, StaticImageData | StaticImageData[]> = {
  PERIOD_START: PancakeImg,
  PERIOD_END: PancakeImg,
  PREPARATION: [PancakeImg, SandwichImg],
  SHOPPING: ShoppingItemsImg,
}
