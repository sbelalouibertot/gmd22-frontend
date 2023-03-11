import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone()
  if (url.pathname === '/') {
    url.pathname = '/home'
    return NextResponse.redirect(url)
  }
}
