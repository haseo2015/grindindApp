import { Paragraph, Text, XStack, YStack, styled } from 'tamagui'

export const StepperBlock = styled(YStack, {
  gap: '$2',
})

export const StepperRow = styled(XStack, {
  items: 'center',
})

export const StepCircle = styled(YStack, {
  width: 28,
  height: 28,
  rounded: 999,
  items: 'center',
  justify: 'center',
  borderWidth: 2,
  borderColor: '$color4',

  variants: {
    state: {
      done: { bg: '$accent9', borderColor: '$accent9' },
      current: { bg: 'transparent', borderColor: '$accent9' },
      pending: { bg: 'transparent', borderColor: '$color4' },
    },
  } as const,
})

export const StepConnector = styled(YStack, {
  flex: 1,
  height: 2,
  bg: '$color4',

  variants: {
    done: {
      true: { bg: '$accent9' },
    },
  } as const,
})

export const StepLabelsRow = styled(XStack, {
  justify: 'space-between',
})

export const StepLabel = styled(Text, {
  flex: 1,
  fontSize: '$2',
  color: '$color11',
  text: 'center',

  variants: {
    active: {
      true: { color: '$color12', fontWeight: '700' },
    },
  } as const,
})

export const ProgressBlock = styled(YStack, {
  gap: '$2',
})

export const ProgressHeaderRow = styled(XStack, {
  justify: 'space-between',
})

export const ProgressLabel = styled(Text, {
  color: '$color11',
})

export const ProgressPercent = styled(Text, {
  color: '$color12',
  fontWeight: '700',
})

export const ProgressTrack = styled(YStack, {
  height: 8,
  rounded: 999,
  bg: '$color4',
  overflow: 'hidden',
})

export const ProgressFill = styled(YStack, {
  height: 8,
  rounded: 999,
  bg: '$accent9',
})

export const InfoSection = styled(YStack, {
  gap: '$2',
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

export const NotFoundState = styled(Paragraph, {
  text: 'center',
  color: '$color11',
  mt: '$4',
})
