export type OrderStatus = 'received' | 'inProgress' | 'completed'

export interface OrderItem {
  serviceId: string
  quantity: number
}

export interface Order {
  id: string
  status: OrderStatus
  progress: number
  items: OrderItem[]
  placedAt: string
  operatorName: string
}
