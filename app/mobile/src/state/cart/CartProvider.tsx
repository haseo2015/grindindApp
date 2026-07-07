import { useMachine } from '@xstate/react'
import React, { createContext, useContext, useMemo } from 'react'
import type { FC, ReactNode } from 'react'

import type { CartItem } from '@/types/cart'

import { cartMachine } from './cartMachine'

export interface CartContextValue {
  items: CartItem[]
  isHydrating: boolean
  addItem: (serviceId: string) => void
  incrementItem: (serviceId: string) => void
  decrementItem: (serviceId: string) => void
  removeItem: (serviceId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, send] = useMachine(cartMachine)

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.context.items,
      isHydrating: state.matches('hydrating'),
      addItem: (serviceId) => send({ type: 'ADD_ITEM', serviceId }),
      incrementItem: (serviceId) => send({ type: 'INCREMENT', serviceId }),
      decrementItem: (serviceId) => send({ type: 'DECREMENT', serviceId }),
      removeItem: (serviceId) => send({ type: 'REMOVE_ITEM', serviceId }),
      clear: () => send({ type: 'CLEAR' }),
    }),
    [state, send],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
