import Image from 'next/image'
import { FC, useMemo } from 'react'

import { EVENT_TYPE_IMAGES, EVENT_TYPE_LABELS } from '@src/constants/events'
import { IEvent } from '@src/generated/gmd22-api'
import { getDiffDateDetails, isPastEvent } from '@src/utils/date'

import { Skeleton } from '../skeleton/Skeleton.styled'
import {
  StyledCardSection,
  StyledDescription,
  StyledEventCard,
  StyledHeader,
} from './EventCard.styled'

type TEventCardProps = {
  event: Pick<IEvent, 'id' | 'type' | 'date'>
  onClick?: VoidFunction
}

const EventCard: FC<TEventCardProps> = ({ event, onClick }) => {
  const _isPastEvent = useMemo(() => isPastEvent(event.date), [event.date])
  const eventDateDetails = useMemo(() => {
    if (_isPastEvent) {
      return 'Terminé'
    }
    return getDiffDateDetails(event.date)
  }, [_isPastEvent, event.date])

  const eventImage = useMemo(() => {
    if (!event.type) {
      return 'unknown.jpeg'
    }
    const imageData = EVENT_TYPE_IMAGES[event.type]
    if (Array.isArray(imageData)) {
      return imageData[Math.floor(Math.random() * imageData.length)]
    }
    return imageData
  }, [event.type])

  return (
    <StyledEventCard onClick={onClick} backgroundImage={`/img/${eventImage}`}>
      <StyledCardSection isCompleted={_isPastEvent}>
        <StyledHeader>
          {!!event?.type ? <h4>{EVENT_TYPE_LABELS[event.type]}</h4> : <Skeleton />}
          <Image src="/img/icons/checkbox.svg" width={20} height={20} />
        </StyledHeader>
        <StyledDescription>{eventDateDetails}</StyledDescription>
      </StyledCardSection>
    </StyledEventCard>
  )
}

export default EventCard
