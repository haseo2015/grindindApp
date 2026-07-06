import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PrimaryButton } from '@/components/PrimaryButton'

import { HOME_ORDERS_COMPLETED } from './constants'
import { Headline, Screen, Subheadline, TrustStat } from './style'

export interface HomeProps {
  onBrowseServices: () => void
}

export const Home: FC<HomeProps> = ({ onBrowseServices }) => {
  const { t } = useTranslation()

  return (
    <Screen testID="home-screen">
      <Headline>{t('home.headline')}</Headline>
      <Subheadline>{t('home.subheadline')}</Subheadline>
      <PrimaryButton onPress={onBrowseServices}>{t('home.cta')}</PrimaryButton>
      <TrustStat>{t('home.trustStat', { count: HOME_ORDERS_COMPLETED })}</TrustStat>
    </Screen>
  )
}
