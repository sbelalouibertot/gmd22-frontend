import { StaticImageData } from 'next/image'

import styled from '@emotion/styled'

type TStyledActionButton = {
  icon?: StaticImageData
  width?: number
}

export const StyledActionButton = styled.button<TStyledActionButton>`
  position: relative;
  background-color: ${p => p.theme.color['background-light']};
  ${p => !!p.icon && `background-image: url(${p.icon.src})`};
  border: none;
  background-size: 24px 24px;
  background-position: center;
  background-repeat: no-repeat;
  height: 35px;
  min-width: 35px;
  ${p => !!p.width && `width: ${p.width}px`};
  border-radius: ${p => p.theme.border.radius['very-large']}px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.07);
`
