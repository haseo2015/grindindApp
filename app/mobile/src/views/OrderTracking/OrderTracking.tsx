import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Screen } from '@/components/Screen'
import { getOrderById } from '@/mocks/orders'

import { ORDER_STEPS } from './constants'
import { buildOrderRows } from './orderRows'
import { getStepState } from './stepState'
import {
  InfoLabel,
  InfoRow,
  InfoSection,
  InfoValue,
  NotFoundState,
  ProgressBlock,
  ProgressFill,
  ProgressHeaderRow,
  ProgressLabel,
  ProgressPercent,
  ProgressTrack,
  SectionTitle,
  StepCircle,
  StepConnector,
  StepLabel,
  StepLabelsRow,
  StepperBlock,
  StepperRow,
  SummaryRow,
  TotalLabel,
  TotalValue,
} from './style'

export interface OrderTrackingProps {
  orderId: string
}

export const OrderTracking: FC<OrderTrackingProps> = ({ orderId }) => {
  const { t } = useTranslation()
  const order = getOrderById(orderId)

  const rows = order ? buildOrderRows(order) : []
  const total = rows.reduce((sum, row) => sum + row.service.price * row.quantity, 0)

  if (!order) {
    return (
      <Screen testID="order-tracking-screen" title={t('orderTracking.title')}>
        <NotFoundState>{t('orderTracking.notFound')}</NotFoundState>
      </Screen>
    )
  }

  return (
    <Screen testID="order-tracking-screen" title={t('orderTracking.title')}>
      <StepperBlock>
        <StepperRow>
          {ORDER_STEPS.map((step, index) => {
            const state = getStepState(step, order.status)

            return (
              <React.Fragment key={step}>
                <StepCircle testID={`order-step-${step}`} state={state}>
                  {state === 'done' ? <Ionicons name="checkmark" size={16} color="white" /> : null}
                </StepCircle>
                {index < ORDER_STEPS.length - 1 ? <StepConnector done={state === 'done'} /> : null}
              </React.Fragment>
            )
          })}
        </StepperRow>
        <StepLabelsRow>
          {ORDER_STEPS.map((step) => (
            <StepLabel key={step} active={getStepState(step, order.status) !== 'pending'}>
              {t(`orderTracking.steps.${step}`)}
            </StepLabel>
          ))}
        </StepLabelsRow>
      </StepperBlock>

      <ProgressBlock>
        <ProgressHeaderRow>
          <ProgressLabel>{t('orderTracking.progress')}</ProgressLabel>
          <ProgressPercent>{`${order.progress}%`}</ProgressPercent>
        </ProgressHeaderRow>
        <ProgressTrack testID="order-progress-track">
          <ProgressFill testID="order-progress-fill" width={`${order.progress}%`} />
        </ProgressTrack>
      </ProgressBlock>

      <InfoSection>
        <SectionTitle>{t('orderTracking.summary')}</SectionTitle>
        {rows.map((row) => (
          <InfoRow key={row.serviceId}>
            <InfoLabel>{row.service.title}</InfoLabel>
            <InfoValue>{`${row.quantity} × €${row.service.price.toFixed(2)}`}</InfoValue>
          </InfoRow>
        ))}
      </InfoSection>
      <SummaryRow>
        <TotalLabel>{t('orderTracking.total')}</TotalLabel>
        <TotalValue>{`€${total.toFixed(2)}`}</TotalValue>
      </SummaryRow>

      <InfoSection>
        <SectionTitle>{t('orderTracking.details')}</SectionTitle>
        <InfoRow>
          <InfoLabel>{t('orderTracking.orderId')}</InfoLabel>
          <InfoValue>{order.id}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>{t('orderTracking.placedAt')}</InfoLabel>
          <InfoValue>{order.placedAt}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>{t('orderTracking.operator')}</InfoLabel>
          <InfoValue>{order.operatorName}</InfoValue>
        </InfoRow>
      </InfoSection>
    </Screen>
  )
}
