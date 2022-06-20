import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { useRecipeQuery } from '@src/generated/gmd22-api'

import { Div } from '../common/div/Div.styled'
import List from '../common/list/List'
import Tag from '../common/tag/Tag'
import Text from '../common/text/Text'

const FoodItem: FC = () => {
  const router = useRouter()
  const recipeId = router.query.recipeId as string

  const { /*loading, */ data } = useRecipeQuery({ variables: { recipeId } })
  const recipe = data?.recipe?.recipe

  return (
    <>
      <Div row spaceBetween fullWidth>
        <Image src="/img/icons/previous.svg" height={20} width={20} />
        <Text weight="bold">Recette</Text>
        <Image src="/img/icons/edit.svg" height={25} width={25} />
      </Div>
      Recette : {recipe?.name}
      <List gap="large">
        {recipe?.recipeInstructions?.map(instruction => (
          <Div key={instruction?.id} gap="small">
            <Text>{instruction?.description}</Text>
            {instruction?.foodItems?.map(foodItem => (
              <Tag
                key={foodItem?.id}
                onClick={() => {
                  if (!!foodItem?.id) {
                    router.push(`/food/${foodItem.id}`)
                  }
                }}
              >
                {foodItem?.name}
              </Tag>
            ))}
          </Div>
        ))}
      </List>
    </>
  )
}

export default FoodItem
