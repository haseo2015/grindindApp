import React from 'react'
import type { ReactElement } from 'react'
import { render } from '@testing-library/react-native'
import { TamaguiProvider } from 'tamagui'

import tamaguiConfig from '../../tamagui.config'

export async function renderWithProviders(ui: ReactElement) {
  return render(
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      {ui}
    </TamaguiProvider>,
  )
}
