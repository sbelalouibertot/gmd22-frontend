import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'

import CookBackground from '@src/../public/img/background/cook.svg'
import WizardPreparationIllustration from '@src/../public/img/illustrations/wizard-preparation.svg'

import { Div } from '../common/div/Div.styled'
import { Skeleton } from '../common/skeleton/Skeleton.styled'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { useCookContext } from './_hooks/useCookContext'
import { StyledButton, StyledCookContainer } from './Cook.styled'

const CookHome = () => {
  const { cookPreparationState, cookPreparationDispatch } = useCookContext()
  const { isLoaded, recipes } = cookPreparationState

  const totalSequentialDurations: {
    preparation?: number
    cooking?: number
  } = useMemo(() => {
    if (!recipes) {
      return {}
    }
    const preparation = recipes.reduce((acc, recipe) => acc + recipe.preparationDuration, 0)
    const cooking = recipes.reduce((acc, recipe) => acc + recipe.cookingDuration, 0)
    return { preparation, cooking }
  }, [recipes])

  const startCookPreparation = useCallback(() => {
    cookPreparationDispatch({ type: 'COOK_PREPARATION_START' })
  }, [cookPreparationDispatch])

  return (
    <StyledCookContainer backgroundImage={CookBackground} gap="large">
      <Header />
      <Div spaceBetween percentWidth={70} percentHeight={58}>
        {isLoaded ? (
          recipes?.map(
            recipe =>
              !!recipe && (
                <Text weight="bold" size="regular" color="text-light" align="center">
                  {recipe?.name} ⭐️
                </Text>
              ),
          )
        ) : (
          <Div center gap="medium">
            <Skeleton height={22} width={240} />
            <Skeleton height={22} width={200} />
          </Div>
        )}
        <Image src={WizardPreparationIllustration} />
      </Div>
      <Div gap="medium" center>
        <Text color="text-lighter" size="regular">
          Temps cumulés théoriques
        </Text>
        <Div gap="xsmall">
          <Text color="text-lighter">
            👨‍🍳 Préparation • {totalSequentialDurations.preparation} min
          </Text>
          {!!totalSequentialDurations.cooking && (
            <Text color="text-lighter">🔥 Cuisson • {totalSequentialDurations.cooking} min</Text>
          )}
        </Div>
      </Div>
      <Link href="/cook/instructions">
        <StyledButton onClick={startCookPreparation}>En cuisine 🥘</StyledButton>
      </Link>
    </StyledCookContainer>
  )
}

export default CookHome