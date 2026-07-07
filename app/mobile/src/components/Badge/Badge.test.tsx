import React from 'react'

import { renderWithProviders } from '@/test/render'

import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its label for the popular tone', async () => {
    const { getByText } = await renderWithProviders(<Badge tone="popular">Popular</Badge>)

    expect(getByText('Popular')).toBeTruthy()
  })

  it('renders its label for the bestValue tone', async () => {
    const { getByText } = await renderWithProviders(<Badge tone="bestValue">Best value</Badge>)

    expect(getByText('Best value')).toBeTruthy()
  })
})
