import React from 'react'

import { renderWithProviders } from '@/test/render'

import { Profile } from './Profile'

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}))

describe('Profile', () => {
  it('renders the title', async () => {
    const { getByTestId, getByText } = await renderWithProviders(<Profile />)

    expect(getByTestId('profile-screen')).toBeTruthy()
    expect(getByText(/profile/i)).toBeTruthy()
  })
})
