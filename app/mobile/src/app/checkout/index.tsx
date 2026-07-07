import { useLocalSearchParams, useRouter } from 'expo-router';

import { Checkout } from '@/views/Checkout';

export default function CheckoutScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId?: string }>();
  const router = useRouter();

  return <Checkout directServiceId={serviceId} onPlaceOrder={() => router.replace('/orders/demo-order')} />;
}
