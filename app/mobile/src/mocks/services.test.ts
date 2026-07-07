import { getServiceById, SERVICES } from './services'

describe('getServiceById', () => {
  it('returns the matching service', () => {
    expect(getServiceById('rank-boost')).toEqual(SERVICES[0])
  })

  it('returns undefined when no service matches', () => {
    expect(getServiceById('does-not-exist')).toBeUndefined()
  })
})
