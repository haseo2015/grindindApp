import { Paragraph, styled, XStack, YStack } from 'tamagui'

export const Bar = styled(XStack, {
  items: 'center',
  gap: '$2',
  mx: -18,
  px: '$4',
  pb: '$3',
  bg: '$background',
  borderBottomWidth: 1,
  borderBottomColor: '$color4',
})

export const BackButton = styled(YStack, {
  width: 32,
  height: 32,
  items: 'center',
  justify: 'center',
})

export const Spacer = styled(YStack, {
  width: 32,
})

export const Title = styled(Paragraph, {
  flex: 1,
  text: 'center',
  fontSize: '$5',
  fontWeight: '600',
  color: '$color12',
})
