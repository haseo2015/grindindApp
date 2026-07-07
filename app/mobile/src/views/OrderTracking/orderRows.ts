import { getServiceById } from '@/mocks/services'
import type { Order } from '@/types/order'
import type { Service } from '@/types/service'

export interface OrderRow {
  serviceId: string
  quantity: number
  service: Service
}

export function buildOrderRows(order: Order): OrderRow[] {
  return order.items
    .map((item) => {
      const service = getServiceById(item.serviceId)
      return service ? { serviceId: item.serviceId, quantity: item.quantity, service } : null
    })
    .filter((row): row is OrderRow => row !== null)
}
