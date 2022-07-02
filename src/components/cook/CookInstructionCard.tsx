import Image from 'next/image'
import { FC } from 'react'

import CheckboxIcon from '@src/../public/img/icons/checkbox.svg'

import Text from '../common/text/Text'
import {
  StyledCardFooter,
  StyledCardHeader,
  StyledInstructionCard,
} from './CookInstructionCard.styled'

type TCookInstructionCard = {
  description: string
  isCompleted: boolean
  onCompleted: VoidFunction
}

const CookInstructionCard: FC<TCookInstructionCard> = ({
  isCompleted,
  onCompleted,
  description,
}) => (
  <StyledInstructionCard onClick={onCompleted}>
    <StyledCardHeader>
      <Text>{description}</Text>
    </StyledCardHeader>
    <StyledCardFooter isCompleted={isCompleted}>
      <Text size="very-small" color={isCompleted ? 'text-dark' : 'text-lighter'}>
        {isCompleted ? 'Complété' : 'Non-complété'}
      </Text>
      <Image src={CheckboxIcon} width={20} height={20} />
    </StyledCardFooter>
  </StyledInstructionCard>
)
export default CookInstructionCard
