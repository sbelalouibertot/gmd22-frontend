import '@emotion/react'

import { ITheme } from '@src/utils/libs/emotion/Theme'

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
