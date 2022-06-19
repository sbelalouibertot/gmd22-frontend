import styled from '@emotion/styled'

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const StyledAction = styled.span`
  font-size: ${p => p.theme.text.size['very-small']}px;
  color: ${p => p.theme.color.primary};
`
