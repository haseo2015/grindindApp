import { assign, fromPromise, setup } from 'xstate'

import type { CartItem } from '@/types/cart'

import { loadCart, saveCart } from './storage'

type CartEvent =
  | { type: 'ADD_ITEM'; serviceId: string }
  | { type: 'INCREMENT'; serviceId: string }
  | { type: 'DECREMENT'; serviceId: string }
  | { type: 'REMOVE_ITEM'; serviceId: string }
  | { type: 'CLEAR' }

function withDelta(items: CartItem[], serviceId: string, delta: number): CartItem[] {
  const existing = items.find((item) => item.serviceId === serviceId)

  if (!existing) {
    return delta > 0 ? [...items, { serviceId, quantity: delta }] : items
  }

  const quantity = existing.quantity + delta
  if (quantity <= 0) {
    return items.filter((item) => item.serviceId !== serviceId)
  }

  return items.map((item) => (item.serviceId === serviceId ? { ...item, quantity } : item))
}

function persisted(items: CartItem[]): CartItem[] {
  void saveCart(items)
  return items
}

export const cartMachine = setup({
  types: {
    context: {} as { items: CartItem[] },
    events: {} as CartEvent,
  },
  actors: {
    loadCart: fromPromise(loadCart),
  },
}).createMachine({
  id: 'cart',
  context: { items: [] },
  initial: 'hydrating',
  states: {
    hydrating: {
      invoke: {
        src: 'loadCart',
        onDone: {
          target: 'ready',
          actions: assign({ items: ({ event }) => event.output }),
        },
        onError: 'ready',
      },
    },
    ready: {
      on: {
        ADD_ITEM: {
          actions: assign({
            items: ({ context, event }) => persisted(withDelta(context.items, event.serviceId, 1)),
          }),
        },
        INCREMENT: {
          actions: assign({
            items: ({ context, event }) => persisted(withDelta(context.items, event.serviceId, 1)),
          }),
        },
        DECREMENT: {
          actions: assign({
            items: ({ context, event }) => persisted(withDelta(context.items, event.serviceId, -1)),
          }),
        },
        REMOVE_ITEM: {
          actions: assign({
            items: ({ context, event }) => persisted(context.items.filter((item) => item.serviceId !== event.serviceId)),
          }),
        },
        CLEAR: {
          actions: assign({ items: () => persisted([]) }),
        },
      },
    },
  },
})
