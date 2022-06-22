import styled from '@emotion/styled'

export const Skeleton = styled.div<{
  width?: number
  flex?: boolean
  height?: number
  delay?: number
  rounded?: boolean
}>`
  display: inline-flex;
  position: relative;
  height: ${p => `${p.height ?? 15}px`};
  width: ${p => `${p.width ?? 50}px`};
  ${p => p.flex && `width: 100%`};
  background: ${p => p.theme.color['background']};
  border-radius: ${p => p.theme.border.radius[p.rounded ? 'large' : 'medium']}px;

  opacity: 0.2;
  @keyframes opacityFadeIn {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.2;
    }
  }

  @keyframes backgroundFadeIn {
    0% {
      opacity: 0.2;
      background-color: ${p => p.theme.color['background']};
    }
    50% {
      opacity: 0.7;
      background-color: ${p => p.theme.color['background-dark']};
    }
    100% {
      opacity: 0.2;
      background-color: ${p => p.theme.color['background']};
    }
  }

  animation: opacityFadeIn 2s infinite ease-in-out, backgroundFadeIn 2s infinite ease-in-out;
  animation-delay: 0.5s;
`
