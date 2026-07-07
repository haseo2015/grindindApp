import AsyncStorage from '@react-native-async-storage/async-storage'

import { loadCart, saveCart } from './storage'

describe('cart storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  it('returns an empty array when nothing is stored', async () => {
    expect(await loadCart()).toEqual([])
  })

  it('round-trips items through save and load', async () => {
    const items = [{ serviceId: 'rank-boost', quantity: 2 }]

    await saveCart(items)

    expect(await loadCart()).toEqual(items)
  })

  it('returns an empty array when the stored value is corrupt JSON', async () => {
    await AsyncStorage.setItem('grindingapp.cart', 'not-json')

    expect(await loadCart()).toEqual([])
  })

  it('returns an empty array when the stored value is not an array', async () => {
    await AsyncStorage.setItem('grindingapp.cart', JSON.stringify({ not: 'an array' }))

    expect(await loadCart()).toEqual([])
  })
})
