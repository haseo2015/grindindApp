import { Paragraph, Text, XStack, YStack, styled } from 'tamagui'

export const List = styled(YStack, {
  gap: '$3',
})

export const Row = styled(XStack, {
  justify: 'space-between',
  items: 'center',
  py: '$2',
  borderBottomWidth: 1,
  borderBottomColor: '$color4',
})

export const RowTitle = styled(Text, {
  color: '$color12',
  fontWeight: '600',
})

export const RowValue = styled(Text, {
  color: '$color11',
})

export const SummaryRow = styled(XStack, {
  justify: 'space-between',
  items: 'center',
  py: '$3',
})

export const TotalLabel = styled(Text, {
  color: '$color11',
})

export const TotalValue = styled(Text, {
  fontSize: '$6',
  fontWeight: '800',
  color: '$color12',
})

export const EmptyState = styled(Paragraph, {
  text: 'center',
  color: '$color11',
  mt: '$4',
})
