import Image from 'next/image'
import { FC } from 'react'

import { useCurrentPeriodRecipeEventsQuery } from '@src/generated/gmd22-api'

import { Div } from '../common/div/Div.styled'
import ListItem from '../common/list/ListItem'
import Text from '../common/text/Text'
import { StyledList } from './Recipes.styled'

const Recipes: FC = () => {
  const { /*loading, */ data } = useCurrentPeriodRecipeEventsQuery()
  const recipes = data?.events?.events?.flatMap(event => event?.recipes)

  return (
    <>
      <Div row spaceBetween fullWidth>
        <Image src="/img/icons/previous.svg" height={20} width={20} />
        <Text weight="bold">Recettes</Text>
        <Image src="/img/icons/edit.svg" height={25} width={25} />
      </Div>
      <StyledList>
        {recipes?.map(
          recipe =>
            !!recipe?.name && (
              <ListItem
                key={recipe?.id}
                title={recipe.name}
                avatar={'/img/pancake.jpeg'}
                details={`👨‍🍳 ${recipe.preparationDuration} min • 🔥 ${recipe.cookingDuration} min`}
                actionIconPath={'/img/icons/next.svg'}
                onActionClick={() => console.log('onClick')}
              />
            ),
        )}
      </StyledList>
    </>
  )
}

export default Recipes
