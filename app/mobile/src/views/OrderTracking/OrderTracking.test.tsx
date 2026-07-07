import React from 'react'

import { renderWithProviders } from '@/test/render'

import { OrderTracking } from './OrderTracking'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('OrderTracking', () => {
  it('renders the order summary, steps and details', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<OrderTracking orderId="demo-order" />)

    expect(getByTestId('order-tracking-screen')).toBeTruthy()
    expect(getByText(/order status/i)).toBeTruthy()
    expect(getByText('Rank Boost')).toBeTruthy()
    expect(getByText('1 × €24.99')).toBeTruthy()
    expect(getByText('€24.99')).toBeTruthy()
    expect(getByText('demo-order')).toBeTruthy()
    expect(getByText('Today, 14:32')).toBeTruthy()
    expect(getByText('Alex')).toBeTruthy()
    expect(getByText('45%')).toBeTruthy()
  })

  it('renders the progress fill width based on the order progress', async () => {
    const { getByTestId } = await renderWithProviders(<OrderTracking orderId="demo-order" />)

    expect(getByTestId('order-progress-fill').props.style).toEqual(
      expect.objectContaining({ width: '45%' }),
    )
  })

  it('marks the current status step as active and later steps as pending', async () => {
    const { getByText } = await renderWithProviders(<OrderTracking orderId="demo-order" />)

    // demo-order status is 'inProgress'
    const received = getByText('Received')
    const inProgress = getByText('In progress')
    const completed = getByText('Completed')

    expect(received.props.style).toEqual(
      expect.objectContaining({ color: expect.anything(), fontWeight: '700' }),
    )
    expect(inProgress.props.style).toEqual(
      expect.objectContaining({ color: expect.anything(), fontWeight: '700' }),
    )
    expect(completed.props.style).not.toEqual(expect.objectContaining({ fontWeight: '700' }))
  })

  it('shows a checkmark for completed steps but not for pending ones', async () => {
    const { getByTestId } = await renderWithProviders(<OrderTracking orderId="demo-order" />)

    expect(getByTestId('order-step-received').props.children).toBeTruthy()
    expect(getByTestId('order-step-completed').props.children).toBeFalsy()
  })

  it('shows a not-found message for an unknown order id', async () => {
    const { getByText } = await renderWithProviders(<OrderTracking orderId="does-not-exist" />)

    expect(getByText(/could not be found/i)).toBeTruthy()
  })
})
