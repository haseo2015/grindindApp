import React from 'react'
import type { FC, ReactNode } from 'react'

import { Header } from '@/components/Header'

import { Content } from './style'

export interface ScreenProps {
  title: string
  showBack?: boolean
  testID?: string
  children?: ReactNode
}

export const Screen: FC<ScreenProps> = ({ title, showBack, testID, children }) => (
  <Content testID={testID}>
    <Header title={title} showBack={showBack} />
    {children}
  </Content>
)
