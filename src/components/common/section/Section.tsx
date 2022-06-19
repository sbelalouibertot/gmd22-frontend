import { FC, ReactNode } from 'react'

import { Div } from '../div/Div.styled'
import { StyledAction, StyledHeader, StyledSection } from './Section.styled'

type TSectionProps = {
  title: string
  action?: string
  children?: ReactNode
}

const Section: FC<TSectionProps> = ({ title, action, children }) => {
  return (
    <StyledSection>
      <StyledHeader>
        <h4>{title}</h4>
        {!!action && <StyledAction>{action}</StyledAction>}
      </StyledHeader>
      <Div>{children}</Div>
    </StyledSection>
  )
}

export default Section
