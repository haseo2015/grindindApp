import { Paragraph, Text, XStack, YStack, styled } from 'tamagui'

export const Hero = styled(YStack, {
  height: 160,
  rounded: '$4',
  bg: '$accent4',
  items: 'center',
  justify: 'center',
})

export const TitleRow = styled(XStack, {
  items: 'center',
  gap: '$2',
})

export const Title = styled(Text, {
  flex: 1,
  fontSize: '$7',
  fontWeight: '800',
  color: '$color12',
})

export const StatsRow = styled(XStack, {
  gap: '$6',
  py: '$3',
  borderBottomWidth: 1,
  borderBottomColor: '$color4',
})

export const Stat = styled(YStack, {
  gap: '$1',
})

export const StatLabel = styled(Text, {
  fontSize: '$2',
  color: '$color11',
})

export const StatValueRow = styled(XStack, {
  items: 'center',
  gap: '$1',
})

export const StatValue = styled(Text, {
  fontSize: '$4',
  fontWeight: '700',
  color: '$color12',
})

export const Description = styled(Paragraph, {
  color: '$color11',
})

export const MoreLink = styled(Text, {
  color: '$accent9',
  fontWeight: '700',
})

export const SectionTitle = styled(Text, {
  fontSize: '$5',
  fontWeight: '700',
  color: '$color12',
})

export const InfoRow = styled(XStack, {
  justify: 'space-between',
  py: '$2',
  borderBottomWidth: 1,
  borderBottomColor: '$color4',
})

export const InfoLabel = styled(Text, {
  color: '$color11',
})

export const InfoValue = styled(Text, {
  color: '$color12',
  fontWeight: '600',
})
