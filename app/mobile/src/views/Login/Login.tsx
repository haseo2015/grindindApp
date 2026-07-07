import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PrimaryButton } from '@/components/PrimaryButton'
import { Screen } from '@/components/Screen'

export interface LoginProps {
  onContinue: () => void
}

export const Login: FC<LoginProps> = ({ onContinue }) => {
  const { t } = useTranslation()

  return (
    <Screen testID="login-screen" title={t('login.title')}>
      <PrimaryButton onPress={onContinue}>{t('login.continue')}</PrimaryButton>
    </Screen>
  )
}
