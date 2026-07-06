import { useRouter } from 'expo-router';

import { Signup } from '@/components/Signup';

export default function SignupScreen() {
  const router = useRouter();

  return <Signup onContinue={() => router.push('/auth/verify-code')} />;
}
