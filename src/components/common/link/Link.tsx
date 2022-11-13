import NextLink, { LinkProps } from 'next/link'
import { FC, ReactNode } from 'react'

const Link: FC<Omit<LinkProps, 'href'> & {
  href?: LinkProps['href']
  children: ReactNode
}> = ({ children, href, ...rest }) =>
  !!href ? (
    <NextLink href={href} {...rest} passHref prefetch>
      <a>{children}</a>
    </NextLink>
  ) : (
    <>{children}</>
  )

export default Link
