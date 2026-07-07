import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Screen, SubText } from '@/components/Screen'

export interface OrderTrackingProps {
  orderId: string
}

export const OrderTracking: FC<OrderTrackingProps> = ({ orderId }) => {
  const { t } = useTranslation()

  return (
    <Screen testID="order-tracking-screen" title={t('orderTracking.title')}>
      <SubText>{orderId}</SubText>
    </Screen>
  )
}
