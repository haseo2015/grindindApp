import React from 'react'

import { renderWithProviders } from '@/test/render'

import { Checkout } from './Checkout'

describe('Checkout', () => {
  it('renders the title', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<Checkout />)

    expect(getByTestId('checkout-screen')).toBeTruthy()
    expect(getByText(/checkout/i)).toBeTruthy()
  })
})
