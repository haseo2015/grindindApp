import { useLocalSearchParams } from 'expo-router';

import { ServiceDetail } from '@/views/ServiceDetail';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ServiceDetail serviceId={id} />;
}
