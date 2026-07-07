import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'

import { loadCart, saveCart } from '@/state/cart/storage'
import { renderWithProviders } from '@/test/render'

import { Checkout } from './Checkout'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('Checkout', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  it('shows an empty state with no direct service and an empty cart', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<Checkout onPlaceOrder={jest.fn()} />)

    expect(getByTestId('checkout-screen')).toBeTruthy()
    await waitFor(() => {
      expect(getByText(/nothing to check out/i)).toBeTruthy()
    })
  })

  it('checks out a single service directly, bypassing the cart', async () => {
    await saveCart([{ serviceId: 'heist-carry', quantity: 1 }])

    const { getByTestId, getByText, queryByText } = await renderWithProviders(
      <Checkout directServiceId="rank-boost" onPlaceOrder={jest.fn()} />,
    )

    await waitFor(() => {
      expect(getByTestId('checkout-row-rank-boost')).toBeTruthy()
    })
    expect(queryByText('Heist Carry')).toBeNull()
    expect(getByText('€24.99')).toBeTruthy()
  })

  it('checks out every item in the cart and clears it on placing the order', async () => {
    await saveCart([
      { serviceId: 'rank-boost', quantity: 2 },
      { serviceId: 'heist-carry', quantity: 1 },
    ])
    const onPlaceOrder = jest.fn()

    const { getByTestId, getByText } = await renderWithProviders(<Checkout onPlaceOrder={onPlaceOrder} />)

    await waitFor(() => {
      expect(getByTestId('checkout-row-rank-boost')).toBeTruthy()
    })
    expect(getByTestId('checkout-row-heist-carry')).toBeTruthy()
    // 24.99 * 2 + 39.99 * 1 = 89.97
    expect(getByText('€89.97')).toBeTruthy()

    fireEvent.press(getByText(/place order/i))

    expect(onPlaceOrder).toHaveBeenCalledTimes(1)
    await waitFor(async () => {
      expect(await loadCart()).toEqual([])
    })
  })

  it('skips cart items whose service no longer exists in the catalog', async () => {
    await saveCart([
      { serviceId: 'rank-boost', quantity: 1 },
      { serviceId: 'discontinued-service', quantity: 3 },
    ])

    const { getByTestId, queryByTestId } = await renderWithProviders(<Checkout onPlaceOrder={jest.fn()} />)

    await waitFor(() => {
      expect(getByTestId('checkout-row-rank-boost')).toBeTruthy()
    })
    expect(queryByTestId('checkout-row-discontinued-service')).toBeNull()
  })

  it('does not clear the cart when checking out a direct service', async () => {
    await saveCart([{ serviceId: 'heist-carry', quantity: 1 }])
    const onPlaceOrder = jest.fn()

    const { getByText } = await renderWithProviders(
      <Checkout directServiceId="rank-boost" onPlaceOrder={onPlaceOrder} />,
    )

    await waitFor(() => {
      expect(getByText(/place order/i)).toBeTruthy()
    })

    fireEvent.press(getByText(/place order/i))

    expect(onPlaceOrder).toHaveBeenCalledTimes(1)
    expect(await loadCart()).toEqual([{ serviceId: 'heist-carry', quantity: 1 }])
  })
})
