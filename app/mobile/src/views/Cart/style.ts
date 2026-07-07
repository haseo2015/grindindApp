import { Paragraph, Text, XStack, YStack, styled } from 'tamagui'

export const List = styled(YStack, {
  gap: '$3',
})

export const Row = styled(XStack, {
  items: 'center',
  gap: '$3',
  p: '$3',
  bg: '$color2',
  rounded: '$4',
  borderWidth: 1,
  borderColor: '$color4',
})

export const Info = styled(YStack, {
  flex: 1,
  gap: '$1',
})

export const Title = styled(Text, {
  fontWeight: '700',
  fontSize: '$4',
  color: '$color12',
})

export const Price = styled(Text, {
  color: '$color11',
})

export const QuantityRow = styled(XStack, {
  items: 'center',
  gap: '$2',
})

export const QuantityButton = styled(YStack, {
  width: 28,
  height: 28,
  rounded: '$2',
  bg: '$color4',
  items: 'center',
  justify: 'center',
})

export const QuantityValue = styled(Text, {
  fontWeight: '700',
  color: '$color12',
  minW: 20,
  text: 'center',
})

export const RemoveButton = styled(YStack, {
  items: 'center',
  justify: 'center',
})

export const EmptyState = styled(Paragraph, {
  text: 'center',
  color: '$color11',
  mt: '$4',
})

export const SummaryRow = styled(XStack, {
  justify: 'space-between',
  items: 'center',
  py: '$3',
  borderTopWidth: 1,
  borderTopColor: '$color4',
})

export const TotalLabel = styled(Text, {
  color: '$color11',
})

export const TotalValue = styled(Text, {
  fontSize: '$6',
  fontWeight: '800',
  color: '$color12',
})
