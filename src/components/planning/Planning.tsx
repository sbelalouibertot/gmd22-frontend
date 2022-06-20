import Image from 'next/image'
import { FC } from 'react'

import EditIcon from '@src/../public/img/icons/edit.svg'
import PreviousIcon from '@src/../public/img/icons/previous.svg'

import { Div } from '../common/div/Div.styled'
import Text from '../common/text/Text'

const Planning: FC = () => {
  return (
    <Div row spaceBetween fullWidth>
      <Image src={PreviousIcon} height={20} width={20} />
      <Text weight="bold">Planning</Text>
      <Image src={EditIcon} height={25} width={25} />
    </Div>
  )
}

export default Planning
