import styled from '@emotion/styled'

export const StyledFoodView = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: ${p => p.theme.spacing.padding.large}px;
`
export const StyledFoodList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: -webkit-fill-available;
`
