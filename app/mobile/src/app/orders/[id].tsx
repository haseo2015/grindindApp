import { useLocalSearchParams } from 'expo-router';

import { OrderTracking } from '@/views/OrderTracking';

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <OrderTracking orderId={id} />;
}
