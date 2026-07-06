import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Screen, Title } from '@/components/Screen'

export const Checkout: FC = () => {
  const { t } = useTranslation()

  return (
    <Screen testID="checkout-screen">
      <Title>{t('checkout.title')}</Title>
    </Screen>
  )
}
