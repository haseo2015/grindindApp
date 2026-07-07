import { getOrderById, ORDERS } from './orders'

describe('getOrderById', () => {
  it('returns the matching order', () => {
    expect(getOrderById('demo-order')).toEqual(ORDERS[0])
  })

  it('returns undefined when no order matches', () => {
    expect(getOrderById('does-not-exist')).toBeUndefined()
  })
})
