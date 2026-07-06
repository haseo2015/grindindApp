import React from 'react'

import { renderWithProviders } from '@/test/render'

import { ServicesCatalog } from './ServicesCatalog'

describe('ServicesCatalog', () => {
  it('renders the title', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<ServicesCatalog />)

    expect(getByTestId('services-catalog-screen')).toBeTruthy()
    expect(getByText(/services/i)).toBeTruthy()
  })
})
