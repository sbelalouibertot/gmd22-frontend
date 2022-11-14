import Image, { ImageProps } from 'next/image'
import { FC, useMemo } from 'react'

import CheckboxIcon from '@src/../public/img/icons/checkbox.svg'
import { EVENT_TYPE_IMAGES, EVENT_TYPE_LABELS } from '@src/constants/events'
import { IEvent } from '@src/generated/gmd22-api'
import { getDiffDateDetails, isPastEvent } from '@src/utils/date'

import BlurredPancakeImg from '../../../../public/img/pancake-blurred.webp'
import BlurredSandwichImg from '../../../../public/img/sandwich-blurred.webp'
import BlurredShoppingItemsImg from '../../../../public/img/shopping-items-blurred.webp'
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
    const _Image = ({ src }: { src?: Pick<ImageProps, 'src'> }) => (
      <Image
        style={{ objectFit: 'cover', objectPosition: 'bottom' }}
        src={src?.src ?? UnknownImg}
        alt="Event"
        priority
        sizes="(max-height: 153px) 153px,
        (max-width: 175px) 175px,
        249px"
        height={175}
        width={153}
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

export const EventCardLoading: FC<{ index: number }> = ({ index }) => {
  const _LoadingImage =
    index < 2 ? [BlurredShoppingItemsImg, BlurredPancakeImg][index] : BlurredSandwichImg
  return (
    <StyledEventCard>
      <Image
        style={{ objectFit: 'cover', objectPosition: 'bottom' }}
        src={_LoadingImage}
        alt="Event"
        sizes="(max-height: 153px) 153px,
        (max-width: 175px) 175px,
        249px"
        priority
        height={175}
        width={153}
      />
      <StyledCardSection isCompleted>
        <StyledHeader>
          <Skeleton width={80} />
          <Image src={CheckboxIcon} alt="Checkbox" />
        </StyledHeader>
        <Text size="very-small" color={'text-dark'}>
          <Skeleton />
        </Text>
      </StyledCardSection>
    </StyledEventCard>
  )
}

export default EventCard
