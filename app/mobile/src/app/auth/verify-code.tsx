import { useRouter } from 'expo-router';

import { VerifyCode } from '@/views/VerifyCode';

export default function VerifyCodeScreen() {
  const router = useRouter();

  return <VerifyCode onConfirm={() => router.replace('/profile')} />;
}
