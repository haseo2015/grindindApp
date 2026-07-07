import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { Header } from './Header'

const mockBack = jest.fn()

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: mockBack }),
}))

describe('Header', () => {
  beforeEach(() => {
    mockBack.mockClear()
  })

  it('renders the title and a back button by default', async () => {
    const { getByText, getByTestId } = await renderWithProviders(<Header title="Checkout" />)

    expect(getByText('Checkout')).toBeTruthy()
    expect(getByTestId('header-back-button')).toBeTruthy()
  })

  it('navigates back when the back button is pressed', async () => {
    const { getByTestId } = await renderWithProviders(<Header title="Checkout" />)

    fireEvent.press(getByTestId('header-back-button'))

    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  it('hides the back button when showBack is false', async () => {
    const { queryByTestId } = await renderWithProviders(<Header title="Services" showBack={false} />)

    expect(queryByTestId('header-back-button')).toBeNull()
  })
})
