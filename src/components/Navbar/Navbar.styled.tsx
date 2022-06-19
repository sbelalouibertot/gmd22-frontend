import styled from '@emotion/styled'

export const StyledNavbarContainer = styled.nav`
  background-color: ${p => p.theme.color['background-light']};
  height: 115px;
  position: absolute;
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.1));
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const StyledTabsContainer = styled.div`
  display: flex;
`

export const StyledTab = styled.div`
  display: flex;
  width: 70px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledTabIcon = styled.img<{ selected: boolean }>`
  ${p => p.selected && `filter: invert(1);`}

  height: 30px;
  width: 40px;
`