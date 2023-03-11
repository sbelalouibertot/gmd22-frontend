import Image from 'next/image'

import styled from '@emotion/styled'

import { Div } from '../common/div/Div.styled'

export const StyledNavbarContainer = styled.nav`
  background-color: ${p => p.theme.color['background-light']};
  height: 65px;
  position: absolute;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 100;
`

export const StyledTabsContainer = styled(Div)`
  display: flex;
`

export const StyledTab = styled(Div)`
  height: 100%;
`

export const StyledTabIcon = styled(Image)<{ selected: boolean }>`
  ${p => p.selected && `filter: invert(1);`}
`

export const StyledMainTabIconContainer = styled(Div)`
  height: 72px;
  width: 72px;
  bottom: 15px;
  background-color: white;
  position: absolute;
  border-radius: 50%;
  left: calc(50% - 36px);
`
