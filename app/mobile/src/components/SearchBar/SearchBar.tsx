import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import type { FC } from 'react'
import { useTheme } from 'tamagui'

import { Bar, StyledInput } from './style'

export interface SearchBarProps {
  value: string
  onChangeText: (value: string) => void
  placeholder: string
}

export const SearchBar: FC<SearchBarProps> = ({ value, onChangeText, placeholder }) => {
  const theme = useTheme()

  return (
    <Bar testID="search-bar">
      <Ionicons name="search" size={18} color={theme.color11.val} />
      <StyledInput
        testID="search-bar-input"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        // placeholderTextColor is a plain RN TextInput prop; tamagui's Input types it as
        // ColorTokens only, but the resolved theme value here is always a real color string.
        placeholderTextColor={theme.color11.val as any}
      />
    </Bar>
  )
}
