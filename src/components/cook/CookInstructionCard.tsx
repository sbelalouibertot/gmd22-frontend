import Image from 'next/image'
import { FC, memo } from 'react'

import CheckboxIcon from '@src/../public/img/icons/checkbox.svg'
import { COMPLETION_STATUS_TO_STR } from '@src/constants/cook'

import Text from '../common/text/Text'
import { TInstructionCompletionStatus } from './_hooks/useCookContext'
import {
  StyledCardFooter,
  StyledCardHeader,
  StyledInstructionCard,
} from './CookInstructionCard.styled'

type TCookInstructionCard = {
  description: string
  completionStatus: TInstructionCompletionStatus
  onCompleted: VoidFunction
}

const CookInstructionCard: FC<TCookInstructionCard> = ({
  completionStatus,
  onCompleted,
  description,
}) => {
  return (
    <StyledInstructionCard onClick={onCompleted}>
      <StyledCardHeader>
        <Text>{description}</Text>
      </StyledCardHeader>
      <StyledCardFooter completionStatus={completionStatus}>
        <Text
          size="very-small"
          color={completionStatus === 'NOT_STARTED' ? 'text-lighter' : 'text-dark'}
        >
          {COMPLETION_STATUS_TO_STR[completionStatus]}
        </Text>
        <Image src={CheckboxIcon} width={20} height={20} />
      </StyledCardFooter>
    </StyledInstructionCard>
  )
}
export default memo(CookInstructionCard)
