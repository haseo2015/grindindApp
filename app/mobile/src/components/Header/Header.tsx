import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import type { FC } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'tamagui'

import { BackButton, Bar, Spacer, Title } from './style'

export interface HeaderProps {
  title: string
  showBack?: boolean
}

export const Header: FC<HeaderProps> = ({ title, showBack = true }) => {
  const router = useRouter()
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <Bar testID="header" pt={insets.top + 8}>
      {showBack ? (
        <BackButton testID="header-back-button" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={theme.color12.val} />
        </BackButton>
      ) : (
        <Spacer />
      )}
      <Title>{title}</Title>
      <Spacer />
    </Bar>
  )
}
