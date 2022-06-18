import '@emotion/react'

import { ITheme } from '@src/styles/design-system/theme'

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
