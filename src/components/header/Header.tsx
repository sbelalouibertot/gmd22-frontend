import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'

import EditIcon from '@src/../public/img/icons/edit.svg'
import PreviousIcon from '@src/../public/img/icons/previous.svg'

import { Div } from '../common/div/Div.styled'
import Text from '../common/text/Text'

type THeader = {
  title?: string
  edit?: boolean
}

export const Header: FC<THeader> = ({ title, edit }) => {
  const router = useRouter()

  const onPreviousIconClicked = useCallback(() => {
    router.push('/home')
  }, [router])

  return (
    <Div row spaceBetween fullWidth>
      <Div percentWidth={10}>
        <Image src={PreviousIcon} height={20} width={20} onClick={onPreviousIconClicked} />
      </Div>
      {!!title && <Text weight="bold">{title}</Text>}
      <Div percentWidth={10}>{edit && <Image src={EditIcon} height={25} width={25} />}</Div>
    </Div>
  )
}
