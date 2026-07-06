import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Screen, Title } from '@/components/Screen'

export const ServicesCatalog: FC = () => {
  const { t } = useTranslation()

  return (
    <Screen testID="services-catalog-screen">
      <Title>{t('servicesCatalog.title')}</Title>
    </Screen>
  )
}
