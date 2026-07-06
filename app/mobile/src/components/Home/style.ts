import { Button, H1, Paragraph, styled, YStack } from 'tamagui'

export const Screen = styled(YStack, {
  flex: 1,
  bg: '$background',
  px: '$4',
  justify: 'center',
  gap: '$4',
})

export const Headline = styled(H1, {
  text: 'center',
})

export const Subheadline = styled(Paragraph, {
  text: 'center',
  color: '$color11',
})

export const CtaButton = styled(Button, {
  bg: '$accent9',
  color: 'white',
  size: '$5',
})

export const TrustStat = styled(Paragraph, {
  text: 'center',
  color: '$color11',
  mt: '$8',
})
