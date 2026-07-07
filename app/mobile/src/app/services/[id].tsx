import { useLocalSearchParams, useRouter } from 'expo-router';

import { ServiceDetail } from '@/views/ServiceDetail';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <ServiceDetail
      serviceId={id}
      onBuyNow={(serviceId) => router.push({ pathname: '/checkout', params: { serviceId } })}
    />
  );
}
