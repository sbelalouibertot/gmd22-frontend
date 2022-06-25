import Image from 'next/image'
import { useMemo } from 'react'

import CookBackground from '@src/../public/img/background/cook.svg'
import WizardPreparationIllustration from '@src/../public/img/illustrations/wizard-preparation.svg'
import { useNextPreparationRecipesQuery } from '@src/generated/gmd22-api'

import { Div } from '../common/div/Div.styled'
import { Skeleton } from '../common/skeleton/Skeleton.styled'
import Text from '../common/text/Text'
import { Header } from '../header/Header'
import { StyledButton, StyledCookContainer } from './Cook.styled'

const Cook = () => {
  const { loading, data } = useNextPreparationRecipesQuery()

  const recipes = data?.nextEvent?.event?.recipes

  const currentRecipe = useMemo(() => {
    if (!recipes || recipes.length === 0) {
      return null
    }
    return recipes[0]
  }, [recipes])

  return (
    <StyledCookContainer backgroundImage={CookBackground} gap="large">
      <Header />
      <Div spaceBetween percentWidth={70} percentHeight={55}>
        {loading ? (
          <Div center gap="medium">
            <Skeleton height={22} width={240} />
            <Skeleton height={22} width={200} />
          </Div>
        ) : (
          <Text weight="bold" size="big" color="text-light" align="center">
            {currentRecipe?.name}
          </Text>
        )}
        <Image src={WizardPreparationIllustration} />
      </Div>
      <Div gap="medium">
        <Text color="text-lighter">👨‍🍳 Préparation {currentRecipe?.preparationDuration} min</Text>
        {currentRecipe?.cookingDuration && (
          <Text color="text-lighter">🔥 Cuisson {currentRecipe?.cookingDuration} min</Text>
        )}
      </Div>
      <StyledButton>En cuisine 🥘</StyledButton>
    </StyledCookContainer>
  )
}

export default Cook
