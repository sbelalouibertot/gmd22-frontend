import dayjs from 'dayjs'
import Image, { StaticImageData } from 'next/image'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDrag } from 'react-dnd'

import CookBackground from '@src/../public/img/background/cook.svg'
import ChronometerIcon from '@src/../public/img/icons/chronometer.svg'
import DragdAndDropIcon from '@src/../public/img/icons/drag-and-drop.svg'
import PauseIcon from '@src/../public/img/icons/pause.svg'
import RestartIcon from '@src/../public/img/icons/restart.svg'
import Link from '@src/components/common/link/Link'

import AnimatedButtonWrapper from '../common/animations/AnimatedButtonWrapper'
import { StyledActionButton } from '../common/button/Button.styled'
import { Div } from '../common/div/Div.styled'
import { StyledIndicator } from '../common/div/Indicator.styled'
import List from '../common/list/List'
import Section from '../common/section/Section'
import Text from '../common/text/Text'
import { TInstructionCompletionStatus, useCookContext } from './_hooks/useCookContext'
import {
  StyledCookContainer,
  StyledInstructionButton,
  StyledInstructionFooter,
  StyledProgressionGauge,
  StyledTimer,
} from './Cook.styled'
import CookInstructionCard, { DropResult } from './CookInstructionCard'

const _CookBackground = CookBackground as StaticImageData
const _ChronometerIcon = ChronometerIcon as StaticImageData
const _DragdAndDropIcon = DragdAndDropIcon as StaticImageData
const _PauseIcon = PauseIcon as StaticImageData
const _RestartIcon = RestartIcon as StaticImageData

const CookInstruction = () => {
  const { cookPreparationState, cookPreparationDispatch } = useCookContext()
  const { recipes } = cookPreparationState

  const [duration, setDuration] = useState<null | number>(null)
  const [isPauseActive, setIsPauseActive] = useState(false)
  const [preparationCompletionPercentage, setPreparationCompletionPercentage] = useState<
    null | number
  >(0)

  const totalInstructionsNb = useMemo(
    () => recipes.reduce((acc, recipe) => acc + recipe.instructions.length, 0),
    [recipes],
  )

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'CHRONOMETER',
    item: { name: 'Chronometer' },
    end: (_, monitor) => {
      const { id, timer } = monitor.getDropResult<DropResult>() ?? {}
      if (!id || !timer) {
        return
      }
      cookPreparationDispatch({
        type: 'COOK_ADD_TIMER_TO_INSTRUCTION',
        payload: {
          instructionId: id,
          timer,
        },
      })
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    const newDuration =
      (dayjs(new Date()).diff(cookPreparationState.startedAt, 'seconds') -
        cookPreparationState.pauses.reduce(
          (acc, pause) =>
            acc +
            (pause.endTime !== null ? dayjs(pause.endTime).diff(pause.startTime, 'seconds') : 0),
          0,
        )) *
      10
    setDuration(newDuration)
  }, [cookPreparationState.pauses, cookPreparationState.startedAt])

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(time => {
        if (time === null) {
          return null
        }
        return time + (isPauseActive ? 0 : 10)
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isPauseActive])

  useEffect(() => {
    const getPercentage = (completionStatus: TInstructionCompletionStatus) => {
      switch (completionStatus) {
        case 'IN_PROGRESS':
          return 50 / totalInstructionsNb
        case 'DONE':
          return 100 / totalInstructionsNb
        default:
          return 0
      }
    }

    const newCalculatedPercentage = Math.floor(
      recipes.reduce(
        (acc, recipe) =>
          acc +
          recipe.instructions.reduce(
            (acc2, instruction) => acc2 + getPercentage(instruction.completionStatus),
            0,
          ),
        0,
      ),
    )
    setPreparationCompletionPercentage(newCalculatedPercentage)
  }, [cookPreparationState.lastUpdate, recipes, totalInstructionsNb])

  const onUpdateInstructionCompletionStatus = useCallback(
    (
      recipeId: string,
      instructionId: string,
      previousCompletionStatus: TInstructionCompletionStatus,
    ) => {
      const newCompletionStatus = ((): TInstructionCompletionStatus => {
        switch (previousCompletionStatus) {
          case 'NOT_STARTED':
            return 'IN_PROGRESS'
          case 'IN_PROGRESS':
            return 'DONE'
          default:
            return 'NOT_STARTED'
        }
      })()
      cookPreparationDispatch({
        type: 'COOK_PREPARATION_UPDATE_INSTRUCTION_COMPLETION_STATUS',
        payload: {
          recipeId,
          instructionId,
          completionStatus: newCompletionStatus,
        },
      })
    },
    [cookPreparationDispatch],
  )

  const onPauseClick = () => {
    cookPreparationDispatch({
      type: isPauseActive ? 'COOK_PREPARATION_PAUSE_STOP' : 'COOK_PREPARATION_PAUSE_START',
    })
    setIsPauseActive(pause => !pause)
  }
  const onRestartClick = () => {
    cookPreparationDispatch({ type: 'COOK_PREPARATION_RESTART' })
  }
  const onEndClick = () => {
    cookPreparationDispatch({ type: 'COOK_PREPARATION_FINISH' })
  }

  return (
    <StyledCookContainer gap="large">
      <Image
        style={{ objectFit: 'contain', objectPosition: 'top' }}
        src={_CookBackground}
        alt="Cook"
      />
      <Div row spaceBetween fullWidth gap="medium">
        <StyledTimer>
          {duration !== null && !isNaN(duration) && (
            <Text>
              {dayjs(100 * duration)
                .format('mm:ss')
                .toString()}
            </Text>
          )}
        </StyledTimer>
        {preparationCompletionPercentage !== null && (
          <StyledProgressionGauge
            flex
            preparationCompletionPercentage={preparationCompletionPercentage}
          >
            {preparationCompletionPercentage}% complétés
          </StyledProgressionGauge>
        )}
      </Div>
      <Div fullWidth flex gap="medium">
        {recipes.map(recipe => (
          <Section key={recipe.id} title={recipe.name} flex>
            <List horizontal forceScrollVisibility verticalPadding fullHeight>
              {recipe.instructions.map(instruction => (
                <AnimatedButtonWrapper absolute key={instruction.id}>
                  <CookInstructionCard
                    id={instruction.id}
                    description={instruction.description}
                    completionStatus={instruction.completionStatus}
                    onCompleted={() =>
                      onUpdateInstructionCompletionStatus(
                        recipe.id,
                        instruction.id,
                        instruction.completionStatus,
                      )
                    }
                    isDropTargetDisplayed={isDragging}
                    timerInitValue={instruction.timer}
                    timerInitDate={instruction.timerInitDate}
                  />
                </AnimatedButtonWrapper>
              ))}
            </List>
          </Section>
        ))}
      </Div>
      <StyledInstructionFooter>
        <StyledActionButton icon={_PauseIcon} onClick={onPauseClick} />
        <Link href={'/cook'}>
          <StyledActionButton icon={_RestartIcon} onClick={onRestartClick} />
        </Link>
        <Div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }} relative>
          <StyledActionButton icon={_ChronometerIcon} role="Handle" ref={drag} />
          <StyledIndicator>
            <Image src={_DragdAndDropIcon} alt="Drag and drop" />
          </StyledIndicator>
        </Div>
        {preparationCompletionPercentage === 100 && (
          <Link href={'/cook/instructions/end'}>
            <StyledInstructionButton onClick={onEndClick}>Fin</StyledInstructionButton>
          </Link>
        )}
      </StyledInstructionFooter>
    </StyledCookContainer>
  )
}

export default memo(CookInstruction)
