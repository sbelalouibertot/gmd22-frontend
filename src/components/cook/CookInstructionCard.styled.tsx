import styled from '@emotion/styled'

import { TTheme } from '@src/styles/design-system/theme'

import { TInstructionCompletionStatus } from './_hooks/useCookContext'

type TInstructionCardProps = {
  isDropTargetDisplayed?: boolean
  isOver?: boolean
}
export const StyledInstructionCard = styled.div<TInstructionCardProps>`
  width: 276px;
  height: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: ${p => p.theme.border.radius.large}px;
  position: relative;

  header,
  footer {
    padding: ${p => p.theme.spacing.padding.small}px;
  }

  background: linear-gradient(357deg, #e4c6bd, #ffffff, #dddeea, #cab599);
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  ${p =>
    p.isDropTargetDisplayed &&
    !p.isOver &&
    `
    opacity: 0.7;
    border: ${p.theme.border.size.medium}px solid ${p.theme.color.progress};
  `}
  ${p => p.isOver && `border: 6px solid ${p.theme.color.success};`}
`

export type TStyledCardSectionProps = {
  completionStatus?: TInstructionCompletionStatus
}

export const StyledCardHeader = styled.header`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const getCompletionStatusColor = (
  completionStatus: TInstructionCompletionStatus,
): keyof TTheme['color'] => {
  switch (completionStatus) {
    case 'IN_PROGRESS':
      return 'progress'
    case 'DONE':
      return 'success'
    default:
      return 'background-light'
  }
}

export const StyledCardFooter = styled.footer<TStyledCardSectionProps>`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  bottom: 0;
  height: 30px;
  width: 100%;
  ${p =>
    !!p.completionStatus &&
    `background-color: ${p.theme.color[getCompletionStatusColor(p.completionStatus)]}`};
  border-radius: 0px 0px ${p => p.theme.border.radius.large}px ${p => p.theme.border.radius.large}px;
`
