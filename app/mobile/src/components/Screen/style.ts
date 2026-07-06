import { H2, Paragraph, styled, YStack } from 'tamagui'

export const Screen = styled(YStack, {
  flex: 1,
  bg: '$background',
  px: '$4',
  pt: '$8',
  gap: '$4',
})

export const Title = styled(H2, {})

export const SubText = styled(Paragraph, {
  color: '$color11',
})
