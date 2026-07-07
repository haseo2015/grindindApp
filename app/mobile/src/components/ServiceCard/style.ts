import { Text, XStack, YStack, styled } from 'tamagui'

export const Card = styled(XStack, {
  items: 'center',
  gap: '$3',
  p: '$3',
  bg: '$color2',
  rounded: '$4',
  borderWidth: 1,
  borderColor: '$color4',
})

export const Thumbnail = styled(YStack, {
  width: 56,
  height: 56,
  rounded: '$3',
  bg: '$accent4',
  items: 'center',
  justify: 'center',
})

export const Info = styled(YStack, {
  flex: 1,
  gap: '$1',
})

export const TitleRow = styled(XStack, {
  items: 'center',
  justify: 'space-between',
  gap: '$2',
})

export const Title = styled(Text, {
  fontWeight: '700',
  fontSize: '$4',
  color: '$color12',
})

export const Category = styled(Text, {
  fontSize: '$2',
  color: '$color11',
})

export const RatingRow = styled(XStack, {
  items: 'center',
  gap: '$1',
})

export const RatingValue = styled(Text, {
  fontSize: '$2',
  color: '$color11',
  ml: '$1',
})
