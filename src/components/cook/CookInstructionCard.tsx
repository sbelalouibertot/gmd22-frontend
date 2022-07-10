import dayjs from 'dayjs'
import Image from 'next/image'
import { FC, memo, RefObject, useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'

import CheckboxIcon from '@src/../public/img/icons/checkbox.svg'
import { COMPLETION_STATUS_TO_STR } from '@src/constants/cook'

import { Div } from '../common/div/Div.styled'
import Text from '../common/text/Text'
import { TInstructionCompletionStatus } from './_hooks/useCookContext'
import { StyledTimerContainer } from './Cook.styled'
import {
  StyledCardFooter,
  StyledCardHeader,
  StyledInstructionCard,
} from './CookInstructionCard.styled'

type TCookInstructionCard = {
  description: string
  completionStatus: TInstructionCompletionStatus
  onCompleted: VoidFunction
  id: string
  isDropTargetDisplayed?: boolean
  timerInitValue?: number
  timerInitDate?: Date
}

export type DropResult = {
  id: string
  timer: number | null
}

const calculateTimer = ({
  monitorOffset,
  cardRef,
}: {
  monitorOffset: number
  cardRef: RefObject<HTMLInputElement>
}) => {
  if (!cardRef.current || !cardRef.current.clientWidth) {
    return null
  }
  const ratio =
    (monitorOffset - cardRef.current.getBoundingClientRect().x) / cardRef.current.clientWidth
  const seconds = Math.floor(60 * 30 * ratio)
  return 1000 * seconds
}

const CookInstructionCard: FC<TCookInstructionCard> = ({
  id,
  completionStatus,
  onCompleted,
  description,
  isDropTargetDisplayed,
  timerInitValue,
  timerInitDate,
}) => {
  const cardRef = useRef<HTMLInputElement>(null)
  const [timerHoverDisplay, setTimerHoverDisplay] = useState<string | null>(null)
  const [timerCountdown, setTimerCountdown] = useState<number | null>(null)

  useEffect(() => {
    if (!timerInitDate || !timerInitValue) {
      setTimerCountdown(null)
      return
    }
    const timeSinceLastTimerSetup = dayjs(new Date()).diff(dayjs(timerInitDate), 'milliseconds')
    const remainingTimer = timerInitValue - timeSinceLastTimerSetup
    setTimerCountdown(remainingTimer)

    const interval = setInterval(() => {
      setTimerCountdown(time => {
        if (!!time) {
          return time - 1000
        }
        return null
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timerInitDate, timerInitValue])

  const [{ isOver, offset }, drop] = useDrop(() => {
    return {
      accept: 'CHRONOMETER',
      drop: (_, monitor) => {
        const monitorOffset = monitor?.getClientOffset()?.x
        if (!monitorOffset) {
          return
        }
        setTimerHoverDisplay(null)
        return { id, timer: calculateTimer({ monitorOffset, cardRef }) }
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        offset: monitor.getClientOffset(),
      }),
    }
  })
  useEffect(() => {
    if (isOver) {
      setTimerHoverDisplay(() => {
        if (
          offset === null ||
          !cardRef?.current?.clientWidth ||
          !cardRef?.current?.offsetLeft ||
          !isOver
        ) {
          return null
        }
        const miliseconds = calculateTimer({ monitorOffset: offset.x, cardRef })
        return dayjs(miliseconds).format('mm:ss')
      })
    }
  }, [isOver, offset])

  return (
    <StyledInstructionCard
      ref={cardRef}
      onClick={onCompleted}
      isDropTargetDisplayed={isDropTargetDisplayed}
      isOver={isOver}
    >
      <Div ref={drop} fullWidth percentHeight={100} row>
        {((!!timerHoverDisplay && isOver) || !!timerCountdown) && (
          <StyledTimerContainer isTimerValidated={!!timerCountdown}>
            <Text size="very-big" align="center">
              {!!timerCountdown ? dayjs(timerCountdown).format('mm:ss') : timerHoverDisplay}
            </Text>
          </StyledTimerContainer>
        )}
        <StyledCardHeader>
          <Text>{description}</Text>
        </StyledCardHeader>
        <StyledCardFooter completionStatus={completionStatus}>
          <Text
            size="very-small"
            color={completionStatus === 'NOT_STARTED' ? 'text-lighter' : 'text-dark'}
          >
            {COMPLETION_STATUS_TO_STR[completionStatus]}
          </Text>
          <Image src={CheckboxIcon} width={20} height={20} />
        </StyledCardFooter>
      </Div>
    </StyledInstructionCard>
  )
}
export default memo(CookInstructionCard)
