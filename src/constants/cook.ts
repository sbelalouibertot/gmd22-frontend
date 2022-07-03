import { TInstructionCompletionStatus } from '@src/components/cook/_hooks/useCookContext'

export const COMPLETION_STATUS_TO_STR: Record<TInstructionCompletionStatus, string> = {
  NOT_STARTED: 'Non commencé',
  IN_PROGRESS: 'En cours',
  DONE: 'Terminé',
}
