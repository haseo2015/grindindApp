import { Paragraph, YStack, styled } from 'tamagui'

export const List = styled(YStack, {
  gap: '$3',
})

export const EmptyState = styled(Paragraph, {
  text: 'center',
  color: '$color11',
  mt: '$4',
})
