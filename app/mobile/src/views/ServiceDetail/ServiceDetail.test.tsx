import React from 'react'

import { renderWithProviders } from '@/test/render'

import { ServiceDetail } from './ServiceDetail'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('ServiceDetail', () => {
  it('renders the title and the service id', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<ServiceDetail serviceId="heist-full" />)

    expect(getByTestId('service-detail-screen')).toBeTruthy()
    expect(getByText(/service detail/i)).toBeTruthy()
    expect(getByText('heist-full')).toBeTruthy()
  })
})
