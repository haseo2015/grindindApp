import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PrimaryButton } from '@/components/PrimaryButton'
import { Screen } from '@/components/Screen'

export interface VerifyCodeProps {
  onConfirm: () => void
}

export const VerifyCode: FC<VerifyCodeProps> = ({ onConfirm }) => {
  const { t } = useTranslation()

  return (
    <Screen testID="verify-code-screen" title={t('verifyCode.title')}>
      <PrimaryButton onPress={onConfirm}>{t('verifyCode.continue')}</PrimaryButton>
    </Screen>
  )
}
