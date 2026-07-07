import { Paragraph, styled, YStack } from 'tamagui'

export const Content = styled(YStack, {
  flex: 1,
  bg: '$background',
  px: '$4',
  gap: '$4',
})

export const SubText = styled(Paragraph, {
  color: '$color11',
})
