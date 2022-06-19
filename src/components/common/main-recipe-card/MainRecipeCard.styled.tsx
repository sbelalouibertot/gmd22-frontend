import styled from '@emotion/styled'

export const StyledMainRecipeCardContainer = styled.div`
  position: relative;
  width: 327px;
  height: 180px;
  background-color: ${p => p.theme.color.primary};
  border-radius: ${p => p.theme.border.radius.large}px;
  overflow: hidden;
`

export const StyledMainRecipeCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  width: 100%;

  color: ${p => p.theme.color['text-light']};
  padding: ${p => p.theme.spacing.padding.large}px;
`

export const StyledTitle = styled.span`
  font-size: ${p => p.theme.text.size.regular}px;
  font-weight: ${p => p.theme.text.weight.medium};
  line-height: 28px;
`

export const StyledSubtitle = styled.span`
  font-size: ${p => p.theme.text.size.small}px;
  font-weight: ${p => p.theme.text.weight.regular};
  line-height: 24px;
`

export const StyledDuration = styled.div`
  > * {
    &:first-child {
      font-size: ${p => p.theme.text.size['very-big']}px;
      font-weight: ${p => p.theme.text.weight.bold};
    }
  }
`

export const StyledImageBackground = styled.div`
  position: absolute;
  left: 175px;
  top: 69px;
  height: 214px;
  width: 214px;
  border-radius: 120px;

  background: url('/img/food.jpeg');
  background-repeat: no-repeat;
  background-size: 320px 272px;
  background-position: center;

  z-index: 0;
`
