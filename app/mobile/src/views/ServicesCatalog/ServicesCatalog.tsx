import React, { useMemo, useState } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { SearchBar } from '@/components/SearchBar'
import { ServiceCard } from '@/components/ServiceCard'
import { Screen } from '@/components/Screen'
import { SERVICES } from '@/mocks/services'

import { EmptyState, List } from './style'

export interface ServicesCatalogProps {
  onSelectService: (serviceId: string) => void
}

export const ServicesCatalog: FC<ServicesCatalogProps> = ({ onSelectService }) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const services = useMemo(
    () => SERVICES.filter((service) => service.title.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  )

  return (
    <Screen testID="services-catalog-screen" title={t('servicesCatalog.title')} showBack={false}>
      <SearchBar value={query} onChangeText={setQuery} placeholder={t('servicesCatalog.searchPlaceholder')} />
      {services.length > 0 ? (
        <List>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onPress={() => onSelectService(service.id)} />
          ))}
        </List>
      ) : (
        <EmptyState>{t('servicesCatalog.empty')}</EmptyState>
      )}
    </Screen>
  )
}
