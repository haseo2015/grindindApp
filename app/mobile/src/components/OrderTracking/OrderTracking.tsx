import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Screen, SubText, Title } from '@/components/Screen'

export interface OrderTrackingProps {
  orderId: string
}

export const OrderTracking: FC<OrderTrackingProps> = ({ orderId }) => {
  const { t } = useTranslation()

  return (
    <Screen testID="order-tracking-screen">
      <Title>{t('orderTracking.title')}</Title>
      <SubText>{orderId}</SubText>
    </Screen>
  )
}
