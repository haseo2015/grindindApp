import { createV5Theme } from '@tamagui/config/v5'

import { terracottaDark, terracottaLight } from './palette'

export const appThemes = createV5Theme({
  accent: {
    light: terracottaLight,
    dark: terracottaDark,
  },
})
