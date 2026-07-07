import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'tamagui'

import { PrimaryButton } from '@/components/PrimaryButton'
import { Screen } from '@/components/Screen'
import { getServiceById } from '@/mocks/services'
import { useCart } from '@/state/cart'

import {
  EmptyState,
  Info,
  List,
  Price,
  QuantityButton,
  QuantityRow,
  QuantityValue,
  RemoveButton,
  Row,
  SummaryRow,
  Title,
  TotalLabel,
  TotalValue,
} from './style'

export interface CartProps {
  onCheckout: () => void
}

export const Cart: FC<CartProps> = ({ onCheckout }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const cart = useCart()

  const rows = cart.items
    .map((item) => {
      const service = getServiceById(item.serviceId)
      return service ? { item, service } : null
    })
    .filter((row) => row !== null)

  const total = rows.reduce((sum, row) => sum + row.service.price * row.item.quantity, 0)

  return (
    <Screen testID="cart-screen" title={t('cart.title')} showBack={false}>
      {rows.length > 0 ? (
        <>
          <List>
            {rows.map(({ item, service }) => (
              <Row key={item.serviceId} testID={`cart-row-${item.serviceId}`}>
                <Info>
                  <Title>{service.title}</Title>
                  <Price>{`€${service.price.toFixed(2)}`}</Price>
                </Info>
                <QuantityRow>
                  <QuantityButton
                    testID={`cart-decrement-${item.serviceId}`}
                    onPress={() => cart.decrementItem(item.serviceId)}
                  >
                    <Ionicons name="remove" size={16} color={theme.color12.val} />
                  </QuantityButton>
                  <QuantityValue>{item.quantity}</QuantityValue>
                  <QuantityButton
                    testID={`cart-increment-${item.serviceId}`}
                    onPress={() => cart.incrementItem(item.serviceId)}
                  >
                    <Ionicons name="add" size={16} color={theme.color12.val} />
                  </QuantityButton>
                </QuantityRow>
                <RemoveButton
                  testID={`cart-remove-${item.serviceId}`}
                  onPress={() => cart.removeItem(item.serviceId)}
                >
                  <Ionicons name="trash-outline" size={18} color={theme.color11.val} />
                </RemoveButton>
              </Row>
            ))}
          </List>
          <SummaryRow>
            <TotalLabel>{t('cart.total')}</TotalLabel>
            <TotalValue>{`€${total.toFixed(2)}`}</TotalValue>
          </SummaryRow>
          <PrimaryButton onPress={onCheckout}>{t('cart.checkout')}</PrimaryButton>
        </>
      ) : (
        <EmptyState>{t('cart.empty')}</EmptyState>
      )}
    </Screen>
  )
}
