import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PrimaryButton } from '@/components/PrimaryButton'
import { Screen } from '@/components/Screen'
import { getServiceById } from '@/mocks/services'
import { useCart } from '@/state/cart'
import type { Service } from '@/types/service'

import { EmptyState, List, Row, RowTitle, RowValue, SummaryRow, TotalLabel, TotalValue } from './style'

export interface CheckoutProps {
  directServiceId?: string
  onPlaceOrder: () => void
}

interface CheckoutRow {
  serviceId: string
  quantity: number
  service: Service
}

export const Checkout: FC<CheckoutProps> = ({ directServiceId, onPlaceOrder }) => {
  const { t } = useTranslation()
  const cart = useCart()

  const rows: CheckoutRow[] = directServiceId
    ? [getServiceById(directServiceId)]
        .filter((service): service is Service => Boolean(service))
        .map((service) => ({ serviceId: service.id, quantity: 1, service }))
    : cart.items
        .map((item) => {
          const service = getServiceById(item.serviceId)
          return service ? { serviceId: item.serviceId, quantity: item.quantity, service } : null
        })
        .filter((row): row is CheckoutRow => row !== null)

  const total = rows.reduce((sum, row) => sum + row.service.price * row.quantity, 0)

  const handlePlaceOrder = () => {
    if (!directServiceId) {
      cart.clear()
    }
    onPlaceOrder()
  }

  return (
    <Screen testID="checkout-screen" title={t('checkout.title')}>
      {rows.length > 0 ? (
        <>
          <List>
            {rows.map((row) => (
              <Row key={row.serviceId} testID={`checkout-row-${row.serviceId}`}>
                <RowTitle>{row.service.title}</RowTitle>
                <RowValue>{`${row.quantity} × €${row.service.price.toFixed(2)}`}</RowValue>
              </Row>
            ))}
          </List>
          <SummaryRow>
            <TotalLabel>{t('checkout.total')}</TotalLabel>
            <TotalValue>{`€${total.toFixed(2)}`}</TotalValue>
          </SummaryRow>
          <PrimaryButton onPress={handlePlaceOrder}>{t('checkout.placeOrder')}</PrimaryButton>
        </>
      ) : (
        <EmptyState>{t('checkout.empty')}</EmptyState>
      )}
    </Screen>
  )
}
