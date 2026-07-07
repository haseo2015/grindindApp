import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'
import type { Service } from '@/types/service'

import { ServiceCard } from './ServiceCard'

const service: Service = {
  id: 'rank-boost',
  title: 'Rank Boost',
  category: 'Progression',
  rating: 4.5,
  badge: 'popular',
  price: 24.99,
  platform: 'PS5, Xbox, PC',
  duration: '24-48h',
  description: 'We grind your character rank while you keep your account.',
}

describe('ServiceCard', () => {
  it('renders the title, category, rating and badge', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<ServiceCard service={service} onPress={jest.fn()} />)

    expect(getByTestId('service-card-rank-boost')).toBeTruthy()
    expect(getByText('Rank Boost')).toBeTruthy()
    expect(getByText('Progression')).toBeTruthy()
    expect(getByText('4.5')).toBeTruthy()
    expect(getByText(/popular/i)).toBeTruthy()
  })

  it('renders without a badge when the service has none', async () => {
    const { queryByText } = await renderWithProviders(
      <ServiceCard service={{ ...service, badge: undefined }} onPress={jest.fn()} />,
    )

    expect(queryByText(/popular/i)).toBeNull()
  })

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn()
    const { getByTestId } = await renderWithProviders(<ServiceCard service={service} onPress={onPress} />)

    fireEvent.press(getByTestId('service-card-rank-boost'))

    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
