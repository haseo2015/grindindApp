import { useRouter } from 'expo-router';

import { ServicesCatalog } from '@/views/ServicesCatalog';

export default function ServicesScreen() {
  const router = useRouter();

  return <ServicesCatalog onSelectService={(id) => router.push(`/services/${id}`)} />;
}
