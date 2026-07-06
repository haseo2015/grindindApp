import { createTamagui } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v5'
import { animations } from '@tamagui/config/v5-rn'

import { appThemes } from './src/theme'

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  animations,
  themes: appThemes,
})

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig
