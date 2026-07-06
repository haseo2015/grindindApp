import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Screen, SubText, Title } from '@/components/Screen'

export interface ServiceDetailProps {
  serviceId: string
}

export const ServiceDetail: FC<ServiceDetailProps> = ({ serviceId }) => {
  const { t } = useTranslation()

  return (
    <Screen testID="service-detail-screen">
      <Title>{t('serviceDetail.title')}</Title>
      <SubText>{serviceId}</SubText>
    </Screen>
  )
}
