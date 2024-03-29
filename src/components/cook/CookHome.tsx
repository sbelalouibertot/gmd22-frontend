import Image, { ImageProps } from 'next/image'
import { useCallback, useMemo } from 'react'

import CookBackground from '@src/../public/img/background/cook.svg'
import WizardPreparationIllustration from '@src/../public/img/illustrations/wizard-preparation.svg'
import Link from '@src/components/common/link/Link'

import AnimatedButtonWrapper from '../common/animations/AnimatedButtonWrapper'
import { Div } from '../common/div/Div.styled'
import { Skeleton } from '../common/skeleton/Skeleton.styled'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { useCookContext } from './_hooks/useCookContext'
import { StyledButton, StyledCookContainer } from './Cook.styled'

const _CookBackground = CookBackground as ImageProps['src']
const _WizardPreparationIllustration = WizardPreparationIllustration as ImageProps['src']

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
    <StyledCookContainer gap="large">
      <Image
        style={{
          objectFit: 'cover',
          position: 'fixed',
          width: '100%',
          top: 0,
        }}
        src={_CookBackground}
        alt="Cook"
      />
      <Header />
      <Div flexStart percentWidth={70} percentHeight={58} zIndex={10} gap="large">
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
        <Image
          src={_WizardPreparationIllustration}
          style={{ objectFit: 'contain' }}
          width={260}
          alt="Preparation illustration"
        />
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
      <AnimatedButtonWrapper>
        <Link href="/cook/instructions">
          <StyledButton onClick={startCookPreparation}>En cuisine 🥘</StyledButton>
        </Link>
      </AnimatedButtonWrapper>
    </StyledCookContainer>
  )
}

export default CookHome
