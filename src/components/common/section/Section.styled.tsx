import styled from '@emotion/styled'

export type TStyledSectionProps = {
  flex?: boolean
}

export const StyledSection = styled.section<TStyledSectionProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${p => p.flex && `flex:1;`}
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
