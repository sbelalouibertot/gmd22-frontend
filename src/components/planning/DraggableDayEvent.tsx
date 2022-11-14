import Image from 'next/image'
import { FC } from 'react'
import { useDrag } from 'react-dnd'

import DragdAndDropIcon from '@src/../public/img/icons/drag-and-drop.svg'

import { StyledActionButton } from '../common/button/Button.styled'
import { Div } from '../common/div/Div.styled'
import { StyledIndicator } from '../common/div/Indicator.styled'
import Text from '../common/text/Text'

type TDraggableDayEvent = {
  id: string
  formattedTime: string
  onUpdateEventDate: (input: { id: string; date: Date }) => void
}

type TDropResult = { date: Date; item: { name: string; id: string } }

const DraggableDayEvent: FC<TDraggableDayEvent> = ({ formattedTime, id, onUpdateEventDate }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'EVENT',
    item: { name: 'Event', id },
    end: (_, monitor) => {
      const { item, date } = monitor.getDropResult<TDropResult>() ?? {}
      if (!item?.id || !date) {
        return
      }
      onUpdateEventDate({ id: item.id, date })
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <Div row flexStart ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }} relative>
      <StyledActionButton width={160} role="Handle" ref={drag}>
        <Text color="text-dark">Programmé pour</Text> <Text weight="bold">{formattedTime}</Text>
        <StyledIndicator>
          <Image src={DragdAndDropIcon} alt="Drag and drop" />
        </StyledIndicator>
      </StyledActionButton>
    </Div>
  )
}

export default DraggableDayEvent
