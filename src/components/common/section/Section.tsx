import { FC, ReactNode } from 'react'

import { Div } from '../div/Div.styled'
import { StyledAction, StyledHeader, StyledSection, TStyledSectionProps } from './Section.styled'

type TSectionProps = {
  title: string
  action?: string
  children?: ReactNode
} & TStyledSectionProps

const Section: FC<TSectionProps> = ({ title, action, flex, children }) => {
  return (
    <StyledSection flex={flex}>
      <StyledHeader>
        <h4>{title}</h4>
        {!!action && <StyledAction>{action}</StyledAction>}
      </StyledHeader>
      <Div flex={flex}>{children}</Div>
    </StyledSection>
  )
}

export default Section
