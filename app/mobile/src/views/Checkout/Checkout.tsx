import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Screen } from '@/components/Screen'

export const Checkout: FC = () => {
  const { t } = useTranslation()

  return <Screen testID="checkout-screen" title={t('checkout.title')} />
}
