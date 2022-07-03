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

export const StyledInstructionFooter = styled.footer`
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${p => p.theme.spacing.gap.small}px;
`

export const StyledInstructionButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  gap: 10px;

  font-size: ${p => p.theme.text.size['very-small']}px;
  max-width: 220px;
  flex: 1;
  height: 32px;

  background: ${p => p.theme.color['primary']};
  border-radius: 12px;
  border: none;
  color: ${p => p.theme.color['text-light']};
`
export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  gap: 10px;

  width: 220px;
  height: 52px;
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

type TStyledProgressionGaugeProps = {
  preparationCompletionPercentage: number
}

export const StyledProgressionGauge = styled(Div)<TStyledProgressionGaugeProps>`
  background-color: ${p => p.theme.color['border-dark']};
  background: linear-gradient(
    90deg,
    ${p => p.theme.color['success']} ${p => p.preparationCompletionPercentage}%,
    ${p => p.theme.color['background-dark']} ${p => p.preparationCompletionPercentage}%
  );
  color: ${p => p.theme.color['text-dark']};
  padding: ${p => p.theme.spacing.padding.xsmall}px;
  border-radius: 10px;
  text-align: center;
`
