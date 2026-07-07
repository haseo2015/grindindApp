import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Screen } from '@/components/Screen'

export const Profile: FC = () => {
  const { t } = useTranslation()

  return <Screen testID="profile-screen" title={t('profile.title')} showBack={false} />
}
