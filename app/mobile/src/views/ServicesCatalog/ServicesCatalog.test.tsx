import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { ServicesCatalog } from './ServicesCatalog'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('ServicesCatalog', () => {
  it('renders the title and the mock services', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<ServicesCatalog onSelectService={jest.fn()} />)

    expect(getByTestId('services-catalog-screen')).toBeTruthy()
    expect(getByText(/services/i)).toBeTruthy()
    expect(getByText('Rank Boost')).toBeTruthy()
    expect(getByText('Heist Carry')).toBeTruthy()
  })

  it('filters services by title as the user types', async () => {
    const { getByTestId, getByText, queryByText } = await renderWithProviders(
      <ServicesCatalog onSelectService={jest.fn()} />,
    )

    fireEvent.changeText(getByTestId('search-bar-input'), 'rank')

    await waitFor(() => {
      expect(getByText('Rank Boost')).toBeTruthy()
      expect(queryByText('Heist Carry')).toBeNull()
    })
  })

  it('shows an empty state when no service matches the search', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<ServicesCatalog onSelectService={jest.fn()} />)

    fireEvent.changeText(getByTestId('search-bar-input'), 'nonexistent service')

    await waitFor(() => {
      expect(getByText(/no services/i)).toBeTruthy()
    })
  })

  it('calls onSelectService when a service card is pressed', async () => {
    const onSelectService = jest.fn()
    const { getByTestId } = await renderWithProviders(<ServicesCatalog onSelectService={onSelectService} />)

    fireEvent.press(getByTestId('service-card-rank-boost'))

    expect(onSelectService).toHaveBeenCalledWith('rank-boost')
  })
})
