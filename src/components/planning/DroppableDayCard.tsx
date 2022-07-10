import { FC, ReactNode } from 'react'
import { useDrop } from 'react-dnd'

import { StyledDayCard, TStyledDayCard } from './Planning.styled'

type TDayCard = {
  children: ReactNode
  date: Date
  onClick: VoidFunction
} & TStyledDayCard

const DroppableDayCard: FC<TDayCard> = ({ children, date, ...rest }) => {
  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: 'EVENT',
      drop: item => ({ item, date }),
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
    }
  })

  return (
    <StyledDayCard ref={drop} {...rest} isOver={isOver}>
      {children}
    </StyledDayCard>
  )
}

export default DroppableDayCard
