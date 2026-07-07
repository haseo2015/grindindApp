import { useRouter } from 'expo-router';

import { Cart } from '@/views/Cart';

export default function CartScreen() {
  const router = useRouter();

  return <Cart onCheckout={() => router.push('/checkout')} />;
}
