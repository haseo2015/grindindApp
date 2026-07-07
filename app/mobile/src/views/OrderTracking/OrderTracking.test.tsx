import React from 'react'

import { renderWithProviders } from '@/test/render'

import { OrderTracking } from './OrderTracking'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('OrderTracking', () => {
  it('renders the title and the order id', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<OrderTracking orderId="order-123" />)

    expect(getByTestId('order-tracking-screen')).toBeTruthy()
    expect(getByText(/order status/i)).toBeTruthy()
    expect(getByText('order-123')).toBeTruthy()
  })
})
