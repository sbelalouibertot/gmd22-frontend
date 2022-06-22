import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'

import EditIcon from '@src/../public/img/icons/edit.svg'
import PreviousIcon from '@src/../public/img/icons/previous.svg'

import { Div } from '../common/div/Div.styled'
import Text from '../common/text/Text'

type THeader = {
  title: string
}

export const Header: FC<THeader> = ({ title }) => {
  const router = useRouter()

  const onPreviousIconClicked = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Div row spaceBetween fullWidth>
      <Image src={PreviousIcon} height={20} width={20} onClick={onPreviousIconClicked} />
      <Text weight="bold">{title}</Text>
      <Image src={EditIcon} height={25} width={25} />
    </Div>
  )
}
