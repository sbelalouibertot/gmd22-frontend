import dayjs from 'dayjs'
import Image from 'next/image'
import { useMemo } from 'react'

import CookBackground from '@src/../public/img/background/cook.svg'
import Link from '@src/components/common/link/Link'

import { Div } from '../common/div/Div.styled'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { useCookContext } from './_hooks/useCookContext'
import { StyledButton, StyledCookContainer } from './Cook.styled'

const CookHome = () => {
  const { cookPreparationState } = useCookContext()
  const { recipes } = cookPreparationState

  const completionDuration = useMemo(
    () =>
      dayjs(cookPreparationState.finishedAt).diff(cookPreparationState.startedAt, 'seconds') -
      cookPreparationState.pauses.reduce(
        (acc, pause) =>
          acc +
          (pause.endTime !== null ? dayjs(pause.endTime).diff(pause.startTime, 'seconds') : 0),
        0,
      ),
    [cookPreparationState.finishedAt, cookPreparationState.pauses, cookPreparationState.startedAt],
  )

  const efficiencyRatio: number | null = useMemo(() => {
    if (!recipes) {
      return null
    }
    const totalSequentialDuration = recipes.reduce(
      (acc, recipe) => acc + recipe.preparationDuration + recipe.cookingDuration,
      0,
    )
    return 100 * ((60 * totalSequentialDuration) / completionDuration) - 100
  }, [completionDuration, recipes])

  return (
    <StyledCookContainer gap="large">
      <Image
        layout="fill"
        objectFit="contain"
        objectPosition="top"
        src={CookBackground}
        alt="Cook"
      />
      <Header />
      <Div percentWidth={85} percentHeight={58} center gap="large">
        <Div fullWidth gap="xsmall">
          <Text size="very-big">Terminé en</Text>
          <Text size="very-big">{dayjs(1000 * completionDuration).format('mm[min] ss[s]')} 🏆</Text>
        </Div>
        {efficiencyRatio !== null && (
          <Div fullWidth gap="xsmall">
            <Text size="big">{"C'est environ "}</Text>
            <Text size="big" weight="bold">
              {efficiencyRatio.toFixed(0)} % plus rapide{' '}
            </Text>
            <Text size="regular">que si les recettes avaient été faites séparément 🚀</Text>
          </Div>
        )}
      </Div>
      <Link href="/home">
        <StyledButton>{"Retour à l'accueil"}</StyledButton>
      </Link>
    </StyledCookContainer>
  )
}

export default CookHome
