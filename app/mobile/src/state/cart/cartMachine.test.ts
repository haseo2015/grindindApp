import AsyncStorage from '@react-native-async-storage/async-storage'
import { createActor, waitFor } from 'xstate'

import { cartMachine } from './cartMachine'
import { loadCart } from './storage'

describe('cartMachine', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  async function startReadyActor() {
    const actor = createActor(cartMachine)
    actor.start()
    await waitFor(actor, (state) => state.matches('ready'))
    return actor
  }

  it('hydrates with an empty cart when nothing is persisted', async () => {
    const actor = await startReadyActor()

    expect(actor.getSnapshot().context.items).toEqual([])
  })

  it('adds a new item with quantity 1', async () => {
    const actor = await startReadyActor()

    actor.send({ type: 'ADD_ITEM', serviceId: 'rank-boost' })

    expect(actor.getSnapshot().context.items).toEqual([{ serviceId: 'rank-boost', quantity: 1 }])
  })

  it('increments quantity when adding the same item again', async () => {
    const actor = await startReadyActor()

    actor.send({ type: 'ADD_ITEM', serviceId: 'rank-boost' })
    actor.send({ type: 'ADD_ITEM', serviceId: 'rank-boost' })

    expect(actor.getSnapshot().context.items).toEqual([{ serviceId: 'rank-boost', quantity: 2 }])
  })

  it('decrements quantity and removes the item once it reaches zero', async () => {
    const actor = await startReadyActor()

    actor.send({ type: 'ADD_ITEM', serviceId: 'rank-boost' })
    actor.send({ type: 'DECREMENT', serviceId: 'rank-boost' })

    expect(actor.getSnapshot().context.items).toEqual([])
  })

  it('ignores decrementing a service that is not in the cart', async () => {
    const actor = await startReadyActor()

    actor.send({ type: 'DECREMENT', serviceId: 'rank-boost' })

    expect(actor.getSnapshot().context.items).toEqual([])
  })

  it('changes the quantity of one item without touching the others', async () => {
    const actor = await startReadyActor()

    actor.send({ type: 'ADD_ITEM', serviceId: 'rank-boost' })
    actor.send({ type: 'ADD_ITEM', serviceId: 'heist-carry' })
    actor.send({ type: 'INCREMENT', serviceId: 'heist-carry' })

    expect(actor.getSnapshot().context.items).toEqual([
      { serviceId: 'rank-boost', quantity: 1 },
      { serviceId: 'heist-carry', quantity: 2 },
    ])
  })

  it('removes an item regardless of quantity', async () => {
    const actor = await startReadyActor()

    actor.send({ type: 'ADD_ITEM', serviceId: 'rank-boost' })
    actor.send({ type: 'ADD_ITEM', serviceId: 'rank-boost' })
    actor.send({ type: 'REMOVE_ITEM', serviceId: 'rank-boost' })

    expect(actor.getSnapshot().context.items).toEqual([])
  })

  it('clears every item', async () => {
    const actor = await startReadyActor()

    actor.send({ type: 'ADD_ITEM', serviceId: 'rank-boost' })
    actor.send({ type: 'ADD_ITEM', serviceId: 'heist-carry' })
    actor.send({ type: 'CLEAR' })

    expect(actor.getSnapshot().context.items).toEqual([])
  })

  it('persists mutations to storage', async () => {
    const actor = await startReadyActor()

    actor.send({ type: 'ADD_ITEM', serviceId: 'rank-boost' })

    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(await loadCart()).toEqual([{ serviceId: 'rank-boost', quantity: 1 }])
  })
})
