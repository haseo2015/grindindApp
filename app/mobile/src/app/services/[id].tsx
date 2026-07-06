import { useLocalSearchParams } from 'expo-router';

import { ServiceDetail } from '@/components/ServiceDetail';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ServiceDetail serviceId={id} />;
}
