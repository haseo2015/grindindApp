import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { fireEvent, renderHook, waitFor } from '@testing-library/react-native'
import { Text } from 'react-native'

import { renderWithProviders } from '@/test/render'

import { useCart } from './CartProvider'

function CartProbe() {
  const cart = useCart()

  return (
    <>
      <Text testID="hydrating">{String(cart.isHydrating)}</Text>
      <Text testID="items">{JSON.stringify(cart.items)}</Text>
      <Text testID="add" onPress={() => cart.addItem('rank-boost')}>
        add
      </Text>
      <Text testID="increment" onPress={() => cart.incrementItem('rank-boost')}>
        increment
      </Text>
      <Text testID="decrement" onPress={() => cart.decrementItem('rank-boost')}>
        decrement
      </Text>
      <Text testID="remove" onPress={() => cart.removeItem('rank-boost')}>
        remove
      </Text>
      <Text testID="clear" onPress={() => cart.clear()}>
        clear
      </Text>
    </>
  )
}

describe('CartProvider', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  it('throws when useCart is used outside a CartProvider', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

    await expect(renderHook(() => useCart())).rejects.toThrow('useCart must be used within a CartProvider')

    consoleError.mockRestore()
  })

  it('exposes cart mutations to consumers', async () => {
    const { getByTestId } = await renderWithProviders(<CartProbe />)

    await waitFor(() => {
      expect(getByTestId('hydrating').props.children).toBe('false')
    })

    fireEvent.press(getByTestId('add'))
    await waitFor(() => {
      expect(getByTestId('items').props.children).toBe(JSON.stringify([{ serviceId: 'rank-boost', quantity: 1 }]))
    })

    fireEvent.press(getByTestId('increment'))
    await waitFor(() => {
      expect(getByTestId('items').props.children).toBe(JSON.stringify([{ serviceId: 'rank-boost', quantity: 2 }]))
    })

    fireEvent.press(getByTestId('decrement'))
    await waitFor(() => {
      expect(getByTestId('items').props.children).toBe(JSON.stringify([{ serviceId: 'rank-boost', quantity: 1 }]))
    })

    fireEvent.press(getByTestId('remove'))
    await waitFor(() => {
      expect(getByTestId('items').props.children).toBe('[]')
    })

    fireEvent.press(getByTestId('add'))
    fireEvent.press(getByTestId('clear'))
    await waitFor(() => {
      expect(getByTestId('items').props.children).toBe('[]')
    })
  })
})
