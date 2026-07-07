import React from 'react'
import type { FC, ReactNode } from 'react'

import { GTA_TITLE_OUTLINE_OFFSETS } from './constants'
import { FillLayer, OutlineLayer, Wrapper } from './style'

export interface GtaTitleProps {
  children: ReactNode
  testID?: string
}

export const GtaTitle: FC<GtaTitleProps> = ({ children, testID }) => (
  <Wrapper testID={testID}>
    {GTA_TITLE_OUTLINE_OFFSETS.map(({ x, y }) => (
      <OutlineLayer key={`${x}-${y}`} transform={[{ translateX: x }, { translateY: y }]}>
        {children}
      </OutlineLayer>
    ))}
    <FillLayer>{children}</FillLayer>
  </Wrapper>
)
