import AsyncStorage from '@react-native-async-storage/async-storage'

import type { CartItem } from '@/types/cart'

const CART_STORAGE_KEY = 'grindingapp.cart'

export async function loadCart(): Promise<CartItem[]> {
  const raw = await AsyncStorage.getItem(CART_STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function saveCart(items: CartItem[]): Promise<void> {
  await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}
