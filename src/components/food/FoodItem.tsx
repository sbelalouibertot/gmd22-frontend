import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import EditIcon from '@src/../public/img/icons/edit.svg'
import PreviousIcon from '@src/../public/img/icons/previous.svg'
import PancakeImg from '@src/../public/img/pancake.jpeg'
import { FOOD_TYPE_TO_STR } from '@src/constants/food'
import { useFoodItemQuery } from '@src/generated/gmd22-api'

import { Div } from '../common/div/Div.styled'
import List from '../common/list/List'
import Tag from '../common/tag/Tag'
import Text from '../common/text/Text'
import { StyledFoodCard } from './Food.styled'

const FoodItem: FC = () => {
  const router = useRouter()
  const foodItemId = router.query.foodId as string

  const { /*loading, */ data } = useFoodItemQuery({ variables: { foodItemId } })
  const foodItem = data?.foodItem?.foodItem

  return (
    <>
      <Div row spaceBetween fullWidth>
        <Image src={PreviousIcon} height={20} width={20} />
        <Text weight="bold">Ingrédient</Text>
        <Image src={EditIcon} height={25} width={25} />
      </Div>

      <Div fullWidth>
        <Link href={'/food'}>
          <Text color="primary" align="right" size="small">
            Voir tous les ingrédients
          </Text>
        </Link>
      </Div>

      <StyledFoodCard spaceBetween>
        <Div gap="large">
          <Div gap="xsmall">
            <Text>{foodItem?.name}</Text>
            {!!foodItem?.type && (
              <Text color="text-lighter" size="very-small">
                {FOOD_TYPE_TO_STR[foodItem.type]}
              </Text>
            )}
          </Div>
          <Image src={PancakeImg} width={140} height={140} objectFit="cover" layout="fixed" />
        </Div>
        <List>
          {foodItem?.recipes?.map(
            recipe =>
              !!recipe && (
                <Tag
                  key={recipe?.id}
                  onClick={() => {
                    if (!!recipe.id) {
                      router.push(`/recipes/${recipe.id}`)
                    }
                  }}
                >
                  {recipe?.name}
                </Tag>
              ),
          )}
        </List>
      </StyledFoodCard>
    </>
  )
}

export default FoodItem
