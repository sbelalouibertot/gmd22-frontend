import { FC, useEffect, useRef, useState } from 'react'

import { useDebounce } from '@src/utils/hooks/useDebounce'

import { StyledList, TStyledListProps } from './List.styled'

type TListProps = {
  onBottomReached?: VoidFunction
  children?: (JSX.Element | false)[] | undefined
} & TStyledListProps

const List: FC<TListProps> = ({ onBottomReached, children, ...rest }) => {
  const listRef = useRef<HTMLUListElement>(null)
  const [isBottomReached, setIsBottomReached] = useState(false)
  const debouncedBottomReachFlag = useDebounce(isBottomReached, 1000)

  useEffect(() => {
    const parentListElement = listRef?.current?.parentElement
    if (!parentListElement) {
      return
    }
    const handleListScroll = () => {
      if (!parentListElement) {
        return
      }
      const { scrollTop, scrollHeight, clientHeight } = parentListElement
      if (scrollTop + clientHeight >= scrollHeight - 1 && !isBottomReached) {
        onBottomReached?.()
        setIsBottomReached(true)
      }
    }
    parentListElement.addEventListener('scroll', handleListScroll)
    return () => parentListElement?.removeEventListener('scroll', handleListScroll)
  }, [isBottomReached, onBottomReached])

  useEffect(() => {
    setIsBottomReached(false)
  }, [debouncedBottomReachFlag])

  return (
    <StyledList {...rest} ref={listRef}>
      {children?.map((child, i) => !!child && <li key={`list-element=${i}`}>{child}</li>)}
    </StyledList>
  )
}

export default List
