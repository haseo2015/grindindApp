import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'

import { saveCart } from '@/state/cart/storage'
import { renderWithProviders } from '@/test/render'

import { Cart } from './Cart'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('Cart', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  it('shows an empty state when the cart has no items', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<Cart onCheckout={jest.fn()} />)

    expect(getByTestId('cart-screen')).toBeTruthy()
    await waitFor(() => {
      expect(getByText(/cart is empty/i)).toBeTruthy()
    })
  })

  it('lists items with quantity and total', async () => {
    await saveCart([
      { serviceId: 'rank-boost', quantity: 2 },
      { serviceId: 'heist-carry', quantity: 1 },
    ])

    const { getByTestId, getByText } = await renderWithProviders(<Cart onCheckout={jest.fn()} />)

    await waitFor(() => {
      expect(getByTestId('cart-row-rank-boost')).toBeTruthy()
    })
    expect(getByText('Rank Boost')).toBeTruthy()
    expect(getByText('Heist Carry')).toBeTruthy()
    // 24.99 * 2 + 39.99 * 1 = 89.97
    expect(getByText('€89.97')).toBeTruthy()
  })

  it('increments and decrements an item quantity', async () => {
    await saveCart([{ serviceId: 'rank-boost', quantity: 1 }])

    const { getByTestId, getByText } = await renderWithProviders(<Cart onCheckout={jest.fn()} />)

    await waitFor(() => {
      expect(getByTestId('cart-increment-rank-boost')).toBeTruthy()
    })

    fireEvent.press(getByTestId('cart-increment-rank-boost'))
    await waitFor(() => {
      expect(getByText('€49.98')).toBeTruthy()
    })

    fireEvent.press(getByTestId('cart-decrement-rank-boost'))
    await waitFor(() => {
      expect(getByText('€24.99')).toBeTruthy()
    })
  })

  it('removes an item from the cart', async () => {
    await saveCart([{ serviceId: 'rank-boost', quantity: 1 }])

    const { getByTestId, getByText } = await renderWithProviders(<Cart onCheckout={jest.fn()} />)

    await waitFor(() => {
      expect(getByTestId('cart-remove-rank-boost')).toBeTruthy()
    })

    fireEvent.press(getByTestId('cart-remove-rank-boost'))

    await waitFor(() => {
      expect(getByText(/cart is empty/i)).toBeTruthy()
    })
  })

  it('skips cart items whose service no longer exists in the catalog', async () => {
    await saveCart([
      { serviceId: 'rank-boost', quantity: 1 },
      { serviceId: 'discontinued-service', quantity: 3 },
    ])

    const { getByTestId, queryByTestId, getAllByText } = await renderWithProviders(<Cart onCheckout={jest.fn()} />)

    await waitFor(() => {
      expect(getByTestId('cart-row-rank-boost')).toBeTruthy()
    })
    expect(queryByTestId('cart-row-discontinued-service')).toBeNull()
    // price row + total both show 24.99 since the unknown item is excluded from the total
    expect(getAllByText('€24.99').length).toBe(2)
  })

  it('calls onCheckout when the checkout CTA is pressed', async () => {
    await saveCart([{ serviceId: 'rank-boost', quantity: 1 }])
    const onCheckout = jest.fn()

    const { getByText } = await renderWithProviders(<Cart onCheckout={onCheckout} />)

    await waitFor(() => {
      expect(getByText(/go to checkout/i)).toBeTruthy()
    })

    fireEvent.press(getByText(/go to checkout/i))

    expect(onCheckout).toHaveBeenCalledTimes(1)
  })
})
