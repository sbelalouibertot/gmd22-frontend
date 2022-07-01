import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import CookBackground from '@src/../public/img/background/cook.svg'

import { Div } from '../common/div/Div.styled'
import Text from '../common/text/Text'
import { useCookContext } from './_hooks/useCookContext'
import {
  StyledButton,
  StyledCookContainer,
  StyledProgressionGauge,
  StyledTimer,
} from './Cook.styled'

const Cook = () => {
  const { cookPreparationState /*, cookPreparationDispatch*/ } = useCookContext()
  //TODO: Debug why startedDate is null in cookPreparationState
  //const { recipes } = cookPreparationState

  console.log('(instruction) cookPreparationState = ', cookPreparationState)

  const [duration, setDuration] = useState(cookPreparationState.startedAt?.getDate() ?? 0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(time => time + 10)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <StyledCookContainer backgroundImage={CookBackground} gap="large">
      <Div row spaceBetween fullWidth gap="medium">
        <StyledTimer>
          <Text>
            {dayjs(100 * duration)
              .format('mm:ss')
              .toString()}
          </Text>
        </StyledTimer>
        <StyledProgressionGauge flex>0 % complétés</StyledProgressionGauge>
      </Div>
      <Text>{}</Text>
      <StyledButton>Suivant</StyledButton>
    </StyledCookContainer>
  )
}

export default Cook
