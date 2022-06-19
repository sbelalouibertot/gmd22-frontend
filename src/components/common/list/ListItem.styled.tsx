import Image from 'next/image'

import styled from '@emotion/styled'

export const StyledListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${p => p.theme.color['background-light']};
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.07);
  border-radius: ${p => p.theme.border.radius.large}px;
  width: 327px;
  height: 84px;
  padding: ${p => p.theme.spacing.padding.medium}px;
`

export const StyledItemAvatar = styled(Image)`
  border-radius: ${p => p.theme.border.radius['very-large']}px;
  width: 52px;
`
