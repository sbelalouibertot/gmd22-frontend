import { FC, ReactNode } from 'react'

import { StyledTag, TStyledTagProps } from './Tag.styled'

type TTagProps = {
  children?: ReactNode
  onClick?: VoidFunction
} & TStyledTagProps

const Tag: FC<TTagProps> = ({ children, ...rest }) => <StyledTag {...rest}>{children}</StyledTag>

export default Tag
