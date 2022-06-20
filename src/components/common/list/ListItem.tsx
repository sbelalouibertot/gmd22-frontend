import Image from 'next/image'
import { FC } from 'react'

import { Div } from '../div/Div.styled'
import Text from '../text/Text'
import { StyledItemAvatar, StyledListItem } from './ListItem.styled'

export type TListItemProps = {
  title: string
  avatar: string
  details: string
  actionIconPath: string
  onClick: VoidFunction
  onActionClick: VoidFunction
}

const ListItem: FC<TListItemProps> = ({
  title,
  avatar,
  details,
  actionIconPath,
  onClick,
  onActionClick,
}) => (
  <StyledListItem onClick={onClick}>
    <Div percentWidth={16}>
      <StyledItemAvatar src={avatar} width={45} height={45} objectFit="cover" layout="fixed" />
    </Div>
    <Div spaceBetween percentWidth={60} gap="small">
      <Text size="small">{title}</Text>
      <Text size="very-small" color="text-lighter">
        {details}
      </Text>
    </Div>
    <Div percentWidth={8}>
      {!!actionIconPath && (
        <Image src={actionIconPath} onClick={onActionClick} width={16} height={16} />
      )}
    </Div>
  </StyledListItem>
)

export default ListItem
