import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { Signup } from './Signup'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('Signup', () => {
  it('renders the title and calls onContinue when pressed', async () => {
    const onContinue = jest.fn()
    const { getByTestId, getByText } = await renderWithProviders(<Signup onContinue={onContinue} />)

    expect(getByTestId('signup-screen')).toBeTruthy()
    expect(getByText(/sign up/i)).toBeTruthy()

    fireEvent.press(getByText(/continue/i))

    expect(onContinue).toHaveBeenCalledTimes(1)
  })
})
