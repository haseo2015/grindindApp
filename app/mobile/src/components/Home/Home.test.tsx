import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { Home } from './Home'

describe('Home', () => {
  it('renders the headline, CTA and trust stat', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<Home onBrowseServices={jest.fn()} />)

    expect(getByTestId('home-screen')).toBeTruthy()
    expect(getByText(/we grind gta6/i)).toBeTruthy()
    expect(getByText(/browse services/i)).toBeTruthy()
    expect(getByText(/500\+ orders completed/i)).toBeTruthy()
  })

  it('calls onBrowseServices when the CTA is pressed', async () => {
    const onBrowseServices = jest.fn()
    const { getByText } = await renderWithProviders(<Home onBrowseServices={onBrowseServices} />)

    fireEvent.press(getByText(/browse services/i))

    expect(onBrowseServices).toHaveBeenCalledTimes(1)
  })
})
