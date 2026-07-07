import React from 'react'
import type { FC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { usePathname, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'tamagui'

import { useCart } from '@/state/cart'

import { NAV_ITEMS } from './constants'
import { Bar, CartBadge, CartBadgeText, IconWrapper, Item, Label } from './style'

export const BottomNavigation: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const cart = useCart()

  const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <Bar testID="bottom-navigation" pb={insets.bottom}>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href

        return (
          <Item key={item.href} testID={`nav-item-${item.icon}`} onPress={() => router.push(item.href)}>
            <IconWrapper>
              <Ionicons
                name={active ? item.icon : `${item.icon}-outline`}
                size={22}
                color={active ? theme.accent9.val : theme.color11.val}
              />
              {item.icon === 'cart' && cartCount > 0 ? (
                <CartBadge testID="cart-badge">
                  <CartBadgeText>{cartCount}</CartBadgeText>
                </CartBadge>
              ) : null}
            </IconWrapper>
            <Label active={active}>{t(item.labelKey)}</Label>
          </Item>
        )
      })}
    </Bar>
  )
}
