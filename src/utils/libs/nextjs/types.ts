import { NextPage } from 'next'
import { FC } from 'react'

export type LayoutProps = {
  wideContent?: boolean
  hideGoBack?: boolean
}

export type Page<T = {}, LayoutCustomProps extends LayoutProps = {}> = NextPage<T> & {
  Layout?: FC<LayoutCustomProps>
}
