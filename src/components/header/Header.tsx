import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'

import HomeIcon from '@src/../public/img/icons/home.svg'
import PreviousIcon from '@src/../public/img/icons/previous.svg'
import Link from '@src/components/common/link/Link'

import { Div } from '../common/div/Div.styled'
import Text from '../common/text/Text'

type THeader = {
  title?: string
}

export const Header: FC<THeader> = ({ title }) => {
  const router = useRouter()

  const onPreviousIconClicked = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Div row spaceBetween fullWidth zIndex={100}>
      <Div percentWidth={10}>
        <Image
          src={PreviousIcon}
          height={20}
          width={20}
          onClick={onPreviousIconClicked}
          alt="Previous"
          placeholder="empty"
        />
      </Div>
      {!!title && <Text weight="bold">{title}</Text>}
      <Div percentWidth={10}>
        <Link href="/home">
          <Image src={HomeIcon} height={20} width={20} alt="Home" placeholder="empty" />
        </Link>
      </Div>
    </Div>
  )
}
