import { Image } from 'expo-image'
import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

import homeBackground from '@/assets/images/BG.webp'
import { GtaTitle } from '@/components/GtaTitle'
import { PrimaryButton } from '@/components/PrimaryButton'

import { HOME_ORDERS_COMPLETED } from './constants'
import { Root, Screen, Subheadline, TrustStat } from './style'

export interface HomeProps {
  onBrowseServices: () => void
}

export const Home: FC<HomeProps> = ({ onBrowseServices }) => {
  const { t } = useTranslation()

  return (
    <Root>
      <Image source={homeBackground} style={StyleSheet.absoluteFill} contentFit="cover" />
      <Screen testID="home-screen">
        <GtaTitle>{t('home.headline')}</GtaTitle>
        <Subheadline>{t('home.subheadline')}</Subheadline>
        <PrimaryButton onPress={onBrowseServices}>{t('home.cta')}</PrimaryButton>
        <TrustStat>{t('home.trustStat', { count: HOME_ORDERS_COMPLETED })}</TrustStat>
      </Screen>
    </Root>
  )
}
