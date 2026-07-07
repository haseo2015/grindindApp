import type { Order } from '@/types/order'

import { buildOrderRows } from './orderRows'

describe('buildOrderRows', () => {
  it('joins order items with their service data', () => {
    const order: Order = {
      id: 'o1',
      status: 'received',
      progress: 0,
      items: [{ serviceId: 'rank-boost', quantity: 2 }],
      placedAt: 'Today',
      operatorName: 'Alex',
    }

    expect(buildOrderRows(order)).toEqual([
      expect.objectContaining({ serviceId: 'rank-boost', quantity: 2, service: expect.objectContaining({ id: 'rank-boost' }) }),
    ])
  })

  it('skips items whose service no longer exists in the catalog', () => {
    const order: Order = {
      id: 'o2',
      status: 'received',
      progress: 0,
      items: [{ serviceId: 'discontinued-service', quantity: 1 }],
      placedAt: 'Today',
      operatorName: 'Alex',
    }

    expect(buildOrderRows(order)).toEqual([])
  })
})
