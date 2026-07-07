import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'tamagui'

import { Badge } from '@/components/Badge'
import { PrimaryButton } from '@/components/PrimaryButton'
import { Screen, SubText } from '@/components/Screen'
import { SecondaryButton } from '@/components/SecondaryButton'
import { getServiceById } from '@/mocks/services'
import { useCart } from '@/state/cart'
import { getStarIcons } from '@/utils/starRating'

import {
  ActionsRow,
  Description,
  DescriptionBlock,
  Hero,
  InfoLabel,
  InfoRow,
  InfoSection,
  InfoValue,
  MoreLink,
  SectionTitle,
  Stat,
  StatLabel,
  StatsRow,
  StatValue,
  StatValueRow,
  Title,
  TitleRow,
} from './style'

export interface ServiceDetailProps {
  serviceId: string
  onBuyNow: (serviceId: string) => void
}

export const ServiceDetail: FC<ServiceDetailProps> = ({ serviceId, onBuyNow }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const cart = useCart()
  const [expanded, setExpanded] = useState(false)
  const service = getServiceById(serviceId)

  if (!service) {
    return (
      <Screen testID="service-detail-screen" title={t('serviceDetail.title')}>
        <SubText>{t('serviceDetail.notFound')}</SubText>
      </Screen>
    )
  }

  const cartItem = cart.items.find((item) => item.serviceId === service.id)

  return (
    <Screen testID="service-detail-screen" title={service.title}>
      <Hero testID="service-detail-hero">
        <Ionicons name="flash" size={48} color={theme.accent9.val} />
      </Hero>
      <TitleRow>
        <Title>{service.title}</Title>
        {service.badge ? <Badge tone={service.badge}>{t(`servicesCatalog.badge.${service.badge}`)}</Badge> : null}
      </TitleRow>
      <StatsRow>
        <Stat>
          <StatLabel>{t('serviceDetail.stats.rating')}</StatLabel>
          <StatValueRow>
            {getStarIcons(service.rating).map((icon, index) => (
              <Ionicons key={index} name={icon} size={14} color={theme.accent9.val} />
            ))}
            <StatValue>{service.rating.toFixed(1)}</StatValue>
          </StatValueRow>
        </Stat>
        <Stat>
          <StatLabel>{t('serviceDetail.stats.duration')}</StatLabel>
          <StatValue>{service.duration}</StatValue>
        </Stat>
      </StatsRow>
      <DescriptionBlock>
        <Description numberOfLines={expanded ? undefined : 3}>{service.description}</Description>
        <MoreLink testID="service-detail-toggle-description" onPress={() => setExpanded((current) => !current)}>
          {expanded ? t('serviceDetail.less') : t('serviceDetail.more')}
        </MoreLink>
      </DescriptionBlock>
      <InfoSection>
        <SectionTitle>{t('serviceDetail.information')}</SectionTitle>
        <InfoRow>
          <InfoLabel>{t('serviceDetail.info.category')}</InfoLabel>
          <InfoValue>{service.category}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>{t('serviceDetail.info.platform')}</InfoLabel>
          <InfoValue>{service.platform}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>{t('serviceDetail.info.price')}</InfoLabel>
          <InfoValue>{`€${service.price.toFixed(2)}`}</InfoValue>
        </InfoRow>
      </InfoSection>
      <ActionsRow>
        <PrimaryButton flex={1} size="$3" onPress={() => onBuyNow(service.id)}>
          {t('serviceDetail.buyNow')}
        </PrimaryButton>
        <SecondaryButton
          flex={1}
          size="$3"
          testID="service-detail-add-to-cart"
          onPress={() => cart.addItem(service.id)}
        >
          {cartItem ? t('serviceDetail.inCart', { count: cartItem.quantity }) : t('serviceDetail.addToCart')}
        </SecondaryButton>
      </ActionsRow>
    </Screen>
  )
}
