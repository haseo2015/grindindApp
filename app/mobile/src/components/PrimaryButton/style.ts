import { Button, styled } from 'tamagui'

import { goldLight } from '@/theme'

export const PrimaryButton = styled(Button, {
  bg: '$accent9',
  // Literal (not a $token): the button background is always the bright
  // gold accent regardless of light/dark theme, so the text must always
  // stay dark — a theme token would flip to near-white in dark mode.
  color: goldLight.accent12,
  size: '$5',
  rounded: 999,
  fontWeight: '700',
})
