import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import { renderWithProviders } from '@/test/render'

import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('renders the placeholder and current value', async () => {
    const { getByTestId } = await renderWithProviders(
      <SearchBar value="heist" onChangeText={jest.fn()} placeholder="Search services" />,
    )

    expect(getByTestId('search-bar-input').props.value).toBe('heist')
    expect(getByTestId('search-bar-input').props.placeholder).toBe('Search services')
  })

  it('calls onChangeText when typing', async () => {
    const onChangeText = jest.fn()
    const { getByTestId } = await renderWithProviders(
      <SearchBar value="" onChangeText={onChangeText} placeholder="Search services" />,
    )

    fireEvent.changeText(getByTestId('search-bar-input'), 'rank')

    expect(onChangeText).toHaveBeenCalledWith('rank')
  })
})
