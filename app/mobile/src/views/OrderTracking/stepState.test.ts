import { getStepState } from './stepState'

describe('getStepState', () => {
  it('marks earlier steps as done', () => {
    expect(getStepState('received', 'inProgress')).toBe('done')
  })

  it('marks the matching step as current', () => {
    expect(getStepState('inProgress', 'inProgress')).toBe('current')
  })

  it('marks later steps as pending', () => {
    expect(getStepState('completed', 'inProgress')).toBe('pending')
  })
})
