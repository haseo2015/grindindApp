import { useRouter } from 'expo-router';

import { VerifyCode } from '@/components/VerifyCode';

export default function VerifyCodeScreen() {
  const router = useRouter();

  return <VerifyCode onConfirm={() => router.replace('/profile')} />;
}
