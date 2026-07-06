import { useLocalSearchParams } from 'expo-router';

import { OrderTracking } from '@/components/OrderTracking';

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <OrderTracking orderId={id} />;
}
