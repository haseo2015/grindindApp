import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { VerifyCode } from './VerifyCode'

describe('VerifyCode', () => {
  it('renders the title and calls onConfirm when pressed', async () => {
    const onConfirm = jest.fn()
    const { getByTestId, getByText } = await renderWithProviders(<VerifyCode onConfirm={onConfirm} />)

    expect(getByTestId('verify-code-screen')).toBeTruthy()
    expect(getByText(/confirmation code/i)).toBeTruthy()

    fireEvent.press(getByText(/^confirm$/i))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })
})
