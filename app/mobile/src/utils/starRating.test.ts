import { getStarIcons } from './starRating'

describe('getStarIcons', () => {
  it('renders full stars for a whole rating', () => {
    expect(getStarIcons(5)).toEqual(['star', 'star', 'star', 'star', 'star'])
  })

  it('renders a half star for .5 ratings', () => {
    expect(getStarIcons(3.5)).toEqual(['star', 'star', 'star', 'star-half', 'star-outline'])
  })

  it('renders outline stars for a zero rating', () => {
    expect(getStarIcons(0)).toEqual([
      'star-outline',
      'star-outline',
      'star-outline',
      'star-outline',
      'star-outline',
    ])
  })

  it('rounds ratings to the nearest half star', () => {
    expect(getStarIcons(4.7)).toEqual(['star', 'star', 'star', 'star', 'star-half'])
  })
})
