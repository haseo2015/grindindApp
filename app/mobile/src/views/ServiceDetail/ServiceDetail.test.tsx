import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { ServiceDetail } from './ServiceDetail'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('ServiceDetail', () => {
  it('renders the service title, stats, information and CTA', async () => {
    const { getByTestId, getAllByText, getByText } = await renderWithProviders(
      <ServiceDetail serviceId="rank-boost" onOrder={jest.fn()} />,
    )

    expect(getByTestId('service-detail-screen')).toBeTruthy()
    expect(getAllByText('Rank Boost').length).toBeGreaterThan(0)
    expect(getByText('4.8')).toBeTruthy()
    expect(getByText('24-48h')).toBeTruthy()
    expect(getByText('PS5, Xbox, PC')).toBeTruthy()
    expect(getByText('€24.99')).toBeTruthy()
    expect(getByText(/order now/i)).toBeTruthy()
  })

  it('toggles the description between collapsed and expanded', async () => {
    const { getByTestId, getByText } = await renderWithProviders(
      <ServiceDetail serviceId="rank-boost" onOrder={jest.fn()} />,
    )

    expect(getByText(/^more$/i)).toBeTruthy()

    fireEvent.press(getByTestId('service-detail-toggle-description'))

    await waitFor(() => {
      expect(getByText(/^less$/i)).toBeTruthy()
    })
  })

  it('calls onOrder with the service id when the CTA is pressed', async () => {
    const onOrder = jest.fn()
    const { getByText } = await renderWithProviders(<ServiceDetail serviceId="rank-boost" onOrder={onOrder} />)

    fireEvent.press(getByText(/order now/i))

    expect(onOrder).toHaveBeenCalledWith('rank-boost')
  })

  it('renders without a badge when the service has none', async () => {
    const { queryByText } = await renderWithProviders(
      <ServiceDetail serviceId="vehicle-unlock" onOrder={jest.fn()} />,
    )

    expect(queryByText(/popular/i)).toBeNull()
    expect(queryByText(/best value/i)).toBeNull()
  })

  it('shows a not-found message for an unknown service id', async () => {
    const { getByText } = await renderWithProviders(<ServiceDetail serviceId="does-not-exist" onOrder={jest.fn()} />)

    expect(getByText(/could not be found/i)).toBeTruthy()
  })
})
