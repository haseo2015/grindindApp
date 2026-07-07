import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { ServiceDetail } from './ServiceDetail'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('ServiceDetail', () => {
  it('renders the service title, stats, information and CTAs', async () => {
    const { getByTestId, getAllByText, getByText } = await renderWithProviders(
      <ServiceDetail serviceId="rank-boost" onBuyNow={jest.fn()} />,
    )

    expect(getByTestId('service-detail-screen')).toBeTruthy()
    expect(getAllByText('Rank Boost').length).toBeGreaterThan(0)
    expect(getByText('4.8')).toBeTruthy()
    expect(getByText('24-48h')).toBeTruthy()
    expect(getByText('PS5, Xbox, PC')).toBeTruthy()
    expect(getByText('€24.99')).toBeTruthy()
    expect(getByText(/buy now/i)).toBeTruthy()
    expect(getByText(/add to cart/i)).toBeTruthy()
  })

  it('toggles the description between collapsed and expanded', async () => {
    const { getByTestId, getByText } = await renderWithProviders(
      <ServiceDetail serviceId="rank-boost" onBuyNow={jest.fn()} />,
    )

    expect(getByText(/^more$/i)).toBeTruthy()

    fireEvent.press(getByTestId('service-detail-toggle-description'))

    await waitFor(() => {
      expect(getByText(/^less$/i)).toBeTruthy()
    })
  })

  it('calls onBuyNow with the service id when the buy now CTA is pressed', async () => {
    const onBuyNow = jest.fn()
    const { getByText } = await renderWithProviders(<ServiceDetail serviceId="rank-boost" onBuyNow={onBuyNow} />)

    fireEvent.press(getByText(/buy now/i))

    expect(onBuyNow).toHaveBeenCalledWith('rank-boost')
  })

  it('adds the service to the cart and reflects the quantity', async () => {
    const { getByTestId, getByText } = await renderWithProviders(
      <ServiceDetail serviceId="rank-boost" onBuyNow={jest.fn()} />,
    )

    fireEvent.press(getByTestId('service-detail-add-to-cart'))

    await waitFor(() => {
      expect(getByText(/in cart \(1\)/i)).toBeTruthy()
    })

    fireEvent.press(getByTestId('service-detail-add-to-cart'))

    await waitFor(() => {
      expect(getByText(/in cart \(2\)/i)).toBeTruthy()
    })
  })

  it('renders without a badge when the service has none', async () => {
    const { queryByText } = await renderWithProviders(
      <ServiceDetail serviceId="vehicle-unlock" onBuyNow={jest.fn()} />,
    )

    expect(queryByText(/popular/i)).toBeNull()
    expect(queryByText(/best value/i)).toBeNull()
  })

  it('shows a not-found message for an unknown service id', async () => {
    const { getByText } = await renderWithProviders(<ServiceDetail serviceId="does-not-exist" onBuyNow={jest.fn()} />)

    expect(getByText(/could not be found/i)).toBeTruthy()
  })
})
