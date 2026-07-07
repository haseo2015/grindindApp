import type { Order } from '@/types/order'

export const ORDERS: Order[] = [
  {
    id: 'demo-order',
    status: 'inProgress',
    progress: 45,
    items: [{ serviceId: 'rank-boost', quantity: 1 }],
    placedAt: 'Today, 14:32',
    operatorName: 'Alex',
  },
  {
    id: 'completed-order',
    status: 'completed',
    progress: 100,
    items: [{ serviceId: 'heist-carry', quantity: 1 }],
    placedAt: 'Yesterday, 09:10',
    operatorName: 'Sam',
  },
]

export function getOrderById(id: string): Order | undefined {
  return ORDERS.find((order) => order.id === id)
}
