import Image, { StaticImageData } from 'next/image'
import { FC } from 'react'

import { Div } from '../div/Div.styled'
import { Skeleton } from '../skeleton/Skeleton.styled'
import Text from '../text/Text'
import { StyledItemAvatar, StyledListItem } from './ListItem.styled'

type TListItemProps = {
  title: string
  avatar: StaticImageData
  details: string
  actionIcon: StaticImageData
  onClick: VoidFunction
  onActionClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const ListItem: FC<TListItemProps> = ({
  title,
  avatar,
  details,
  actionIcon,
  onClick,
  onActionClick,
}) => {
  return (
    <StyledListItem onClick={onClick}>
      <Div percentWidth={16}>
        {!!avatar && (
          <StyledItemAvatar src={avatar} width={45} height={45} objectFit="cover" layout="fixed" />
        )}
      </Div>
      <Div spaceBetween percentWidth={60} gap="small">
        <Text size="small">{title}</Text>
        <Text size="very-small" color="text-lighter">
          {details}
        </Text>
      </Div>
      <Div percentWidth={8}>
        {!!actionIcon && <Image src={actionIcon} onClick={onActionClick} width={18} height={18} />}
      </Div>
    </StyledListItem>
  )
}

export const ListItemLoading = () => (
  <StyledListItem>
    <Div percentWidth={16}>
      <Skeleton width={45} height={45} />
    </Div>
    <Div spaceBetween percentWidth={60} gap="medium">
      <Div start gap="small">
        <Skeleton width={130} />
        <Skeleton width={50} />
      </Div>
      <Div row start gap="small">
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
