import { DarkTheme, DefaultTheme, Stack, ThemeProvider, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, YStack } from 'tamagui';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { BottomNavigation } from '@/components/BottomNavigation';
import '@/i18n';
import { CartProvider } from '@/state/cart';
import tamaguiConfig from '../../tamagui.config';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const showBottomNavigation = pathname !== '/';

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? 'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <CartProvider>
          <AnimatedSplashOverlay />
          <YStack flex={1}>
            <YStack flex={1}>
              <Stack screenOptions={{ headerShown: false }} />
            </YStack>
            {showBottomNavigation ? <BottomNavigation /> : null}
          </YStack>
        </CartProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
