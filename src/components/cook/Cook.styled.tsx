import { StaticImageData } from 'next/image'

import styled from '@emotion/styled'

import { Div } from '../common/div/Div.styled'

type TCookContainerProps = {
  backgroundImage: StaticImageData
}
export const StyledCookContainer = styled(Div)<TCookContainerProps>`
  height: 100%;
  width: 100%;
  background-image: ${p => !!p.backgroundImage && `url(${p.backgroundImage.src})`};
  background-color: ${p => p.theme.color['background-dark']};
  background-repeat: no-repeat;
  padding: ${p => p.theme.spacing.padding.large}px;
  justify-content: flex-start;
  align-items: center;
`

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  gap: 10px;

  position: absolute;
  width: 220px;
  height: 52px;

  bottom: 40px;
  background: #cf3a47;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: ${p => p.theme.text.size.regular}px;
`

export const StyledTimer = styled(Div)`
  background-color: ${p => p.theme.color['border-dark']};
  color: ${p => p.theme.color['text-light']};
  padding: ${p => p.theme.spacing.padding.xsmall}px;
  border-radius: 10px;
  width: 85px;
  text-align: center;
`

export const StyledProgressionGauge = styled(Div)`
  background-color: ${p => p.theme.color['border-dark']};
  color: ${p => p.theme.color['text-light']};
  padding: ${p => p.theme.spacing.padding.xsmall}px;
  border-radius: 10px;
  text-align: center;
`
