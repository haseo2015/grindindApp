import { Input, XStack, styled } from 'tamagui'

export const Bar = styled(XStack, {
  items: 'center',
  gap: '$2',
  bg: '$color2',
  rounded: 999,
  px: '$3',
  py: '$2',
  borderWidth: 1,
  borderColor: '$color4',
})

export const StyledInput = styled(Input, {
  flex: 1,
  bg: 'transparent',
  borderWidth: 0,
  p: 0,
  height: 'auto',
  fontSize: '$3',
  color: '$color12',
})
