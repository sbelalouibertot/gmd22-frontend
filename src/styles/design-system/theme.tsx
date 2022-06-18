import { border } from './border'
import { color } from './color'
import { spacing } from './spacing'
import { text } from './text'

export const theme = {
  color,
  border,
  spacing,
  text,
}

export type ITheme = typeof theme
