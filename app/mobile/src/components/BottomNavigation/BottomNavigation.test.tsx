import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'
import { saveCart } from '@/state/cart/storage'

import { BottomNavigation } from './BottomNavigation'

const mockPush = jest.fn()
let mockPathname = '/'

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
}))

describe('BottomNavigation', () => {
  beforeEach(async () => {
    mockPush.mockClear()
    mockPathname = '/'
    await AsyncStorage.clear()
  })

  it('renders all nav items', async () => {
    const { getByTestId } = await renderWithProviders(<BottomNavigation />)

    expect(getByTestId('bottom-navigation')).toBeTruthy()
    expect(getByTestId('nav-item-home')).toBeTruthy()
    expect(getByTestId('nav-item-list')).toBeTruthy()
    expect(getByTestId('nav-item-cart')).toBeTruthy()
    expect(getByTestId('nav-item-person')).toBeTruthy()
  })

  it('navigates when a nav item is pressed', async () => {
    const { getByTestId } = await renderWithProviders(<BottomNavigation />)

    fireEvent.press(getByTestId('nav-item-list'))

    expect(mockPush).toHaveBeenCalledWith('/services')
  })

  it('does not show a cart badge when the cart is empty', async () => {
    const { queryByTestId } = await renderWithProviders(<BottomNavigation />)

    expect(queryByTestId('cart-badge')).toBeNull()
  })

  it('shows the total item count once the cart is hydrated with items', async () => {
    await saveCart([
      { serviceId: 'rank-boost', quantity: 2 },
      { serviceId: 'heist-carry', quantity: 1 },
    ])

    const { getByText } = await renderWithProviders(<BottomNavigation />)

    await waitFor(() => {
      expect(getByText('3')).toBeTruthy()
    })
  })
})
