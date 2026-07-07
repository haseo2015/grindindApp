export type ServiceBadge = 'popular' | 'bestValue'

export interface Service {
  id: string
  title: string
  category: string
  rating: number
  badge?: ServiceBadge
  price: number
  platform: string
  duration: string
  description: string
}
