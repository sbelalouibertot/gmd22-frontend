import Image, { StaticImageData } from 'next/image'
import { FC, useMemo } from 'react'

import CheckboxIcon from '@src/../public/img/icons/checkbox.svg'
import { EVENT_TYPE_IMAGES, EVENT_TYPE_LABELS } from '@src/constants/events'
import { IEvent } from '@src/generated/gmd22-api'
import { getDiffDateDetails, isPastEvent } from '@src/utils/date'

import UnknownImg from '../../../../public/img/unknown.jpeg'
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
    const _Image = ({ src }: { src?: StaticImageData }) => (
      <Image
        style={{ objectFit: 'cover', objectPosition: 'bottom' }}
        src={src ?? UnknownImg}
        alt="Event"
        sizes="(max-height: 153px) 153px,
        (max-width: 175px) 175px,
        249px"
        height={175}
        width={153}
        placeholder="blur"
      />
    )
    if (!event.type) {
      return <_Image />
    }
    const imageData = EVENT_TYPE_IMAGES[event.type]
    if (Array.isArray(imageData)) {
      return <_Image src={imageData[Math.floor(Math.random() * imageData.length)]} />
    }
    return <_Image src={imageData} />
  }, [event.type])

  return (
    <StyledEventCard onClick={onClick}>
      {eventImage}
      <StyledCardSection isCompleted={isCompleted}>
        <StyledHeader>
          <h4>{!!event.type && EVENT_TYPE_LABELS[event.type]}</h4>
          <Image src={CheckboxIcon} alt="Checkbox" />
        </StyledHeader>
        <Text size="very-small" color={isCompleted ? 'text-dark' : 'text-lighter'}>
          {eventDateDetails}
        </Text>
      </StyledCardSection>
    </StyledEventCard>
  )
}

export default EventCard
