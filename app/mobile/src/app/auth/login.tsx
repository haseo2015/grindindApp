import { useRouter } from 'expo-router';

import { Login } from '@/views/Login';

export default function LoginScreen() {
  const router = useRouter();

  return <Login onContinue={() => router.replace('/profile')} />;
}
