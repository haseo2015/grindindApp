import { Paragraph, styled, YStack } from 'tamagui'

export const Root = styled(YStack, {
  flex: 1,
})

export const Screen = styled(YStack, {
  flex: 1,
  px: '$4',
  justify: 'center',
  gap: '$4',
})

export const Subheadline = styled(Paragraph, {
  text: 'center',
  color: 'white',
})

export const TrustStat = styled(Paragraph, {
  text: 'center',
  color: '$accent9',
  fontWeight: '700',
  mt: '$8',
})
