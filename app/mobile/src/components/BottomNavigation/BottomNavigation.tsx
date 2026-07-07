import React from 'react'
import type { FC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { usePathname, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'tamagui'

import { NAV_ITEMS } from './constants'
import { Bar, Item, Label } from './style'

export const BottomNavigation: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  return (
    <Bar testID="bottom-navigation" pb={insets.bottom}>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href

        return (
          <Item key={item.href} testID={`nav-item-${item.icon}`} onPress={() => router.push(item.href)}>
            <Ionicons
              name={active ? item.icon : `${item.icon}-outline`}
              size={22}
              color={active ? theme.accent9.val : theme.color11.val}
            />
            <Label active={active}>{t(item.labelKey)}</Label>
          </Item>
        )
      })}
    </Bar>
  )
}
