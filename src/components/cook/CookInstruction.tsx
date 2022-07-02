import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import CookBackground from '@src/../public/img/background/cook.svg'

import { Div } from '../common/div/Div.styled'
import List from '../common/list/List'
import Section from '../common/section/Section'
import Text from '../common/text/Text'
import { useCookContext } from './_hooks/useCookContext'
import {
  StyledButton,
  StyledCookContainer,
  StyledProgressionGauge,
  StyledTimer,
} from './Cook.styled'
import CookInstructionCard from './CookInstructionCard'

const CookInstruction = () => {
  const { cookPreparationState /*, cookPreparationDispatch*/ } = useCookContext()
  const { recipes } = cookPreparationState

  const [duration, setDuration] = useState<null | number>(null)

  useEffect(() => {
    setDuration(dayjs(new Date()).diff(cookPreparationState.startedAt, 'seconds') * 10)
  }, [cookPreparationState.startedAt])

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(time => {
        if (time !== null) {
          return time + 10
        }
        return null
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <StyledCookContainer backgroundImage={CookBackground} gap="large">
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
        <StyledProgressionGauge flex>0 % complétés</StyledProgressionGauge>
      </Div>
      <Div fullWidth percentHeight={75} gap="medium">
        {recipes.map(recipe => (
          <Section key={recipe.id} title={recipe.name} flex>
            <List horizontal forceScrollVisibility verticalPadding fullHeight>
              {recipe.instructions.map(instruction => (
                <CookInstructionCard
                  key={instruction.id}
                  description={instruction.description}
                  isCompleted={false}
                  onCompleted={() => console.log('on completed', instruction.id)}
                />
              ))}
            </List>
          </Section>
        ))}
      </Div>
      <StyledButton>Suivant</StyledButton>
    </StyledCookContainer>
  )
}

export default CookInstruction
