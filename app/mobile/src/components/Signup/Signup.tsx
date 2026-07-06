import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PrimaryButton } from '@/components/PrimaryButton'
import { Screen, Title } from '@/components/Screen'

export interface SignupProps {
  onContinue: () => void
}

export const Signup: FC<SignupProps> = ({ onContinue }) => {
  const { t } = useTranslation()

  return (
    <Screen testID="signup-screen">
      <Title>{t('signup.title')}</Title>
      <PrimaryButton onPress={onContinue}>{t('signup.continue')}</PrimaryButton>
    </Screen>
  )
}
