import type { OrderStatus } from '@/types/order'

import { ORDER_STEPS } from './constants'

export type StepState = 'done' | 'current' | 'pending'

export function getStepState(step: OrderStatus, currentStatus: OrderStatus): StepState {
  const stepIndex = ORDER_STEPS.indexOf(step)
  const currentIndex = ORDER_STEPS.indexOf(currentStatus)

  if (stepIndex < currentIndex) return 'done'
  if (stepIndex === currentIndex) return 'current'
  return 'pending'
}
