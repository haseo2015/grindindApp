import { createV5Theme } from '@tamagui/config/v5'

import { goldDark, goldLight, navyDarkBase, navyLightBase } from './palette'

export const appThemes = createV5Theme({
  darkPalette: [...navyDarkBase],
  lightPalette: [...navyLightBase],
  accent: {
    light: goldLight,
    dark: goldDark,
  },
})
