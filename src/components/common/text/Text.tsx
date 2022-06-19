import { FC, ReactNode } from 'react'

import { StyledText, TStyledTextProps } from './Text.styled'

type TTextProps = {
  children?: ReactNode
} & TStyledTextProps

const Text: FC<TTextProps> = ({ children, ...rest }) => (
  <StyledText {...rest}>{children}</StyledText>
)

export default Text
