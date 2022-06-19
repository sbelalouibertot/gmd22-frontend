import { FC } from 'react'

import { StyledList, TStyledListProps } from './List.styled'

type TListProps = {
  children?: (JSX.Element | false)[] | undefined
} & TStyledListProps

const List: FC<TListProps> = ({ children, ...rest }) => (
  <StyledList {...rest}>
    {children?.map((child, i) => !!child && <li key={`list-element=${i}`}>{child}</li>)}
  </StyledList>
)

export default List
