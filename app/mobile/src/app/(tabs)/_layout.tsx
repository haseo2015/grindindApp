import { Slot } from 'expo-router';
import { YStack } from 'tamagui';

import { BottomNavigation } from '@/components/BottomNavigation';

export default function TabsLayout() {
  return (
    <YStack flex={1}>
      <YStack flex={1}>
        <Slot />
      </YStack>
      <BottomNavigation />
    </YStack>
  );
}
