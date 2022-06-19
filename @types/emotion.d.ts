import '@emotion/react'

import { TBorder } from '@src/styles/design-system/border'
import { TColor } from '@src/styles/design-system/color'
import { TSpacing } from '@src/styles/design-system/spacing'
import { TText } from '@src/styles/design-system/text'
import { TTheme } from '@src/utils/libs/emotion/design-system/theme'

declare module '@emotion/react' {
  export interface Theme extends TTheme {
    color: TColor
    border: TBorder
    spacing: TSpacing
    text: TText
  }
}
