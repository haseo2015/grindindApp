import { Text, View, styled } from 'tamagui'

export const BadgeRoot = styled(View, {
  px: '$2',
  py: '$1',
  rounded: 999,

  variants: {
    tone: {
      popular: { bg: '$accent4' },
      bestValue: { bg: '$color4' },
    },
  } as const,
})

export const BadgeText = styled(Text, {
  fontSize: '$1',
  fontWeight: '700',

  variants: {
    tone: {
      popular: { color: '$accent11' },
      bestValue: { color: '$color12' },
    },
  } as const,
})
