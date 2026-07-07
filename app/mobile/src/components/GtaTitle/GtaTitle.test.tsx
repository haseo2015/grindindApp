import React from 'react'

import { renderWithProviders } from '@/test/render'

import { GtaTitle } from './GtaTitle'

describe('GtaTitle', () => {
  it('renders the title text', async () => {
    const { getAllByText } = await renderWithProviders(<GtaTitle>We grind GTA6</GtaTitle>)

    expect(getAllByText('We grind GTA6').length).toBeGreaterThan(0)
  })
})
