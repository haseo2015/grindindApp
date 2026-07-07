import React from 'react'
import type { FC, ReactNode } from 'react'

import type { ServiceBadge } from '@/types/service'

import { BadgeRoot, BadgeText } from './style'

export interface BadgeProps {
  tone: ServiceBadge
  children: ReactNode
}

export const Badge: FC<BadgeProps> = ({ tone, children }) => (
  <BadgeRoot tone={tone}>
    <BadgeText tone={tone}>{children}</BadgeText>
  </BadgeRoot>
)
