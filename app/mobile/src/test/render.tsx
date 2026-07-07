import React from 'react'
import type { ReactElement } from 'react'
import { render } from '@testing-library/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiProvider } from 'tamagui'

import tamaguiConfig from '../../tamagui.config'

const TEST_SAFE_AREA_FRAME = { x: 0, y: 0, width: 390, height: 844 }
const TEST_SAFE_AREA_INSETS = { top: 0, left: 0, right: 0, bottom: 0 }

export async function renderWithProviders(ui: ReactElement) {
  return render(
    <SafeAreaProvider initialMetrics={{ frame: TEST_SAFE_AREA_FRAME, insets: TEST_SAFE_AREA_INSETS }}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        {ui}
      </TamaguiProvider>
    </SafeAreaProvider>,
  )
}
