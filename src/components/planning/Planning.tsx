import Image from 'next/image'
import { FC } from 'react'

import { Div } from '../common/div/Div.styled'
import Text from '../common/text/Text'

const Planning: FC = () => {
  return (
    <Div row spaceBetween fullWidth>
      <Image src="/img/icons/previous.svg" height={20} width={20} />
      <Text bold>Planning</Text>
      <Image src="/img/icons/edit.svg" height={25} width={25} />
    </Div>
  )
}

export default Planning
