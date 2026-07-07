import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Screen } from '@/components/Screen'

export const ServicesCatalog: FC = () => {
  const { t } = useTranslation()

  return <Screen testID="services-catalog-screen" title={t('servicesCatalog.title')} showBack={false} />
}
