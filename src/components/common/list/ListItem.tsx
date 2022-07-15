import Image, { StaticImageData } from 'next/image'
import { FC, ReactNode } from 'react'

import Link from '@src/components/common/link/Link'

import AnimatedButtonWrapper from '../animations/AnimatedButtonWrapper'
import { Div } from '../div/Div.styled'
import { Skeleton } from '../skeleton/Skeleton.styled'
import Text from '../text/Text'
import { StyledItemAvatar, StyledListItem, StyledMainText } from './ListItem.styled'

type TListItemProps = {
  title: string
  avatar?: StaticImageData | string
  details?: string
  actionIcon?: StaticImageData
  onClick?: VoidFunction
  onActionClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  percentWidth?: number
  small?: boolean
  linkTo?: string
}

const ListItem: FC<TListItemProps> = ({
  title,
  avatar,
  details,
  actionIcon,
  onClick,
  onActionClick,
  percentWidth,
  small,
  linkTo,
}) => {
  const ParentContainer: FC<{ children: ReactNode }> = ({ children }) =>
    !!linkTo ? <Link href={linkTo}>{children}</Link> : <>{children}</>

  return (
    <ParentContainer>
      <StyledListItem onClick={onClick} percentWidth={percentWidth}>
        <Div percentWidth={16}>
          {!!avatar && (
            <StyledItemAvatar
              src={avatar}
              width={45}
              height={45}
              objectFit="cover"
              layout="fixed"
            />
          )}
        </Div>
        <Div spaceBetween percentWidth={60} gap="small">
          <StyledMainText size={small ? 'very-small' : 'small'}>{title}</StyledMainText>
          <Text size="very-small" color="text-lighter">
            {details}
          </Text>
        </Div>
        <Div percentWidth={8}>
          <AnimatedButtonWrapper>
            {!!onActionClick && !!actionIcon && (
              <Image
                src={actionIcon}
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  onActionClick(e)
                }}
                width={18}
                height={18}
              />
            )}
          </AnimatedButtonWrapper>
        </Div>
      </StyledListItem>
    </ParentContainer>
  )
}

export const ListItemLoading = () => (
  <StyledListItem>
    <Div percentWidth={16}>
      <Skeleton width={45} height={45} />
    </Div>
    <Div spaceBetween percentWidth={60} gap="medium">
      <Div flexStart gap="small">
        <Skeleton width={130} />
        <Skeleton width={50} />
      </Div>
      <Div row flexStart gap="small">
        <Skeleton height={15} width={40} />
        <Skeleton height={15} width={40} />
      </Div>
    </Div>
    <Div percentWidth={8}>
      <Skeleton width={25} height={25} />
    </Div>
  </StyledListItem>
)

export default ListItem
