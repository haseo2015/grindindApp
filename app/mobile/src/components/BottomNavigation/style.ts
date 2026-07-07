import { Text, View, XStack, YStack, styled } from 'tamagui'

import { goldLight } from '@/theme'

export const Bar = styled(XStack, {
  bg: '$background',
  borderTopWidth: 1,
  borderTopColor: '$color4',
  justify: 'space-around',
  py: '$2',
})

export const Item = styled(YStack, {
  items: 'center',
  gap: '$1',
  px: '$3',
  py: '$1',
})

export const IconWrapper = styled(View, {
  position: 'relative',
})

export const CartBadge = styled(View, {
  position: 'absolute',
  t: -4,
  r: -8,
  minW: 16,
  height: 16,
  px: 3,
  rounded: 999,
  bg: '$accent9',
  items: 'center',
  justify: 'center',
})

export const CartBadgeText = styled(Text, {
  fontSize: 10,
  fontWeight: '700',
  // Literal (not a $token): the badge background is always the bright gold
  // accent regardless of light/dark theme, so the text must always stay dark.
  color: goldLight.accent12,
})

export const Label = styled(Text, {
  fontSize: '$2',
  color: '$color11',

  variants: {
    active: {
      true: {
        color: '$accent9',
        fontWeight: '700',
      },
    },
  } as const,
})
