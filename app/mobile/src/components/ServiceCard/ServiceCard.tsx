import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'tamagui'

import { Badge } from '@/components/Badge'
import type { Service } from '@/types/service'
import { getStarIcons } from '@/utils/starRating'

import { Card, Category, Info, RatingRow, RatingValue, Thumbnail, Title, TitleRow } from './style'

export interface ServiceCardProps {
  service: Service
  onPress: () => void
}

export const ServiceCard: FC<ServiceCardProps> = ({ service, onPress }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Card testID={`service-card-${service.id}`} onPress={onPress}>
      <Thumbnail>
        <Ionicons name="flash" size={24} color={theme.accent9.val} />
      </Thumbnail>
      <Info>
        <TitleRow>
          <Title>{service.title}</Title>
          {service.badge ? <Badge tone={service.badge}>{t(`servicesCatalog.badge.${service.badge}`)}</Badge> : null}
        </TitleRow>
        <RatingRow>
          {getStarIcons(service.rating).map((icon, index) => (
            <Ionicons key={index} name={icon} size={14} color={theme.accent9.val} />
          ))}
          <RatingValue>{service.rating.toFixed(1)}</RatingValue>
        </RatingRow>
        <Category>{service.category}</Category>
      </Info>
    </Card>
  )
}
