import Image from 'next/image'
import { FC, useMemo } from 'react'

import CheckboxIcon from '@src/../public/img/icons/checkbox.svg'
import { EVENT_TYPE_IMAGES, EVENT_TYPE_LABELS } from '@src/constants/events'
import { IEvent } from '@src/generated/gmd22-api'
import { getDiffDateDetails, isPastEvent } from '@src/utils/date'

import UnknownImg from '../../../../public/img/unknown.jpeg'
import { Skeleton } from '../skeleton/Skeleton.styled'
import Text from '../text/Text'
import { StyledCardSection, StyledEventCard, StyledHeader } from './EventCard.styled'

interface TEventCardProps {
  event: Pick<IEvent, 'id' | 'type' | 'date'>
  onClick?: VoidFunction
}
const EventCard: FC<TEventCardProps> = ({ event, onClick }) => {
  const isCompleted = useMemo(() => isPastEvent(event.date), [event.date])
  const eventDateDetails = useMemo(() => {
    if (isCompleted) {
      return 'Terminé'
    }
    return getDiffDateDetails(event.date)
  }, [isCompleted, event.date])

  const eventImage = useMemo(() => {
    if (!event.type) {
      return UnknownImg
    }
    const imageData = EVENT_TYPE_IMAGES[event.type]
    if (Array.isArray(imageData)) {
      return imageData[Math.floor(Math.random() * imageData.length)]
    }
    return imageData
  }, [event.type])

  return (
    <StyledEventCard onClick={onClick} backgroundImage={eventImage}>
      <StyledCardSection isCompleted={isCompleted}>
        <StyledHeader>
          <h4>{!!event.type && EVENT_TYPE_LABELS[event.type]}</h4>
          <Image src={CheckboxIcon} width={20} height={20} />
        </StyledHeader>
        <Text size="very-small" color={isCompleted ? 'text-dark' : 'text-lighter'}>
          {eventDateDetails}
        </Text>
      </StyledCardSection>
    </StyledEventCard>
  )
}

export const EventCardLoading: FC = () => (
  <StyledEventCard>
    <StyledCardSection>
      <StyledHeader>
        <Skeleton width={80} />
        <Skeleton width={20} height={20} />
      </StyledHeader>
      <Skeleton />
    </StyledCardSection>
  </StyledEventCard>
)

export default EventCard
