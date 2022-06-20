import Image from 'next/image'
import router from 'next/router'
import { FC } from 'react'

import EditIcon from '@src/../public/img/icons/edit.svg'
import NextIcon from '@src/../public/img/icons/next.svg'
import PreviousIcon from '@src/../public/img/icons/previous.svg'
import PancakeImg from '@src/../public/img/pancake.jpeg'
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
        <Image src={PreviousIcon} height={20} width={20} />
        <Text weight="bold">Recettes</Text>
        <Image src={EditIcon} height={25} width={25} />
      </Div>
      <StyledList>
        {recipes?.map(
          recipe =>
            !!recipe?.name && (
              <ListItem
                key={recipe?.id}
                title={recipe.name}
                avatar={PancakeImg}
                details={`👨‍🍳 ${recipe.preparationDuration} min • 🔥 ${recipe.cookingDuration} min`}
                actionIcon={NextIcon}
                onClick={() => {
                  if (!!recipe.id) {
                    router.push(`/recipes/${recipe.id}`)
                  }
                }}
                onActionClick={() => console.log('onClick')}
              />
            ),
        )}
      </StyledList>
    </>
  )
}

export default Recipes
