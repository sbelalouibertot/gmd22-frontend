import { Page } from 'utils/libs/nextjs/types'

import Planning from '@src/components/planning/Planning'
import { MainLayout } from '@src/layouts/MainLayout'

type Props = {}

const PlanningContainer: Page<Props> = () => (
  <MainLayout>
    <Planning />
  </MainLayout>
)

PlanningContainer.Layout = MainLayout

export default PlanningContainer
