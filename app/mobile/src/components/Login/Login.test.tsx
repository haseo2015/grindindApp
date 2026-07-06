import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { Login } from './Login'

describe('Login', () => {
  it('renders the title and calls onContinue when pressed', async () => {
    const onContinue = jest.fn()
    const { getByTestId, getByText } = await renderWithProviders(<Login onContinue={onContinue} />)

    expect(getByTestId('login-screen')).toBeTruthy()
    expect(getByText(/log in/i)).toBeTruthy()

    fireEvent.press(getByText(/continue/i))

    expect(onContinue).toHaveBeenCalledTimes(1)
  })
})
