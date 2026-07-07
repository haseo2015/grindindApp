import { useRouter } from 'expo-router';

import { Home } from '@/views/Home';

export default function HomeScreen() {
  const router = useRouter();

  return <Home onBrowseServices={() => router.push('/services')} />;
}
