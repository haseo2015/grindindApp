import { Text, XStack, YStack, styled } from 'tamagui'

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
