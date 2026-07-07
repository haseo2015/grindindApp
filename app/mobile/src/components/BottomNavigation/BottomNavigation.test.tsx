import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { BottomNavigation } from './BottomNavigation'

const mockPush = jest.fn()
let mockPathname = '/'

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
}))

describe('BottomNavigation', () => {
  beforeEach(() => {
    mockPush.mockClear()
    mockPathname = '/'
  })

  it('renders all nav items', async () => {
    const { getByTestId } = await renderWithProviders(<BottomNavigation />)

    expect(getByTestId('bottom-navigation')).toBeTruthy()
    expect(getByTestId('nav-item-home')).toBeTruthy()
    expect(getByTestId('nav-item-list')).toBeTruthy()
    expect(getByTestId('nav-item-person')).toBeTruthy()
  })

  it('navigates when a nav item is pressed', async () => {
    const { getByTestId } = await renderWithProviders(<BottomNavigation />)

    fireEvent.press(getByTestId('nav-item-list'))

    expect(mockPush).toHaveBeenCalledWith('/services')
  })
})
