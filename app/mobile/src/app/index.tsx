import { useRouter } from 'expo-router';

import { Home } from '@/components/Home';

export default function HomeScreen() {
  const router = useRouter();

  return <Home onBrowseServices={() => router.push('/services')} />;
}
