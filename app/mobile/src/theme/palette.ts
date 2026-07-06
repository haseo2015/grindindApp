/**
 * Brand accent scale, anchored on Vixaplay's documented brand color
 * (their Figma "Color Shades Kit" base: #F9C034, a mustard/gold yellow).
 * accent9 below matches that base almost exactly. 12-step scale following
 * the radix/tamagui convention: 1-2 app backgrounds, 3-5 subtle
 * surfaces/borders, 6-8 borders/hover, 9-10 solid (buttons), 11-12
 * low/high contrast text.
 */
export const goldLight = {
  accent1: '#FCFAF2',
  accent2: '#FAF4E5',
  accent3: '#F7EAC9',
  accent4: '#F5DEA3',
  accent5: '#F4D27B',
  accent6: '#F6C955',
  accent7: '#F7C545',
  accent8: '#F8C23A',
  accent9: '#F9C134',
  accent10: '#F5B514',
  accent11: '#C69310',
  accent12: '#4F3F17',
} as const

export const goldDark = {
  accent1: '#302812',
  accent2: '#413516',
  accent3: '#574519',
  accent4: '#725A1D',
  accent5: '#8F6F1E',
  accent6: '#BB8E1B',
  accent7: '#ECAE13',
  accent8: '#F4B925',
  accent9: '#F9C134',
  accent10: '#F4C54E',
  accent11: '#EDDDB6',
  accent12: '#F6F4EE',
} as const

/**
 * Base neutral scale, navy-tinted (instead of Tamagui's default pure gray)
 * to match the near-black, slightly-blue dark surfaces of the Vixaplay
 * reference (leaderboard/rank screens).
 */
export const navyDarkBase = [
  '#080911',
  '#0E0F1B',
  '#151623',
  '#1E1F2F',
  '#2A2B3C',
  '#3B3D4E',
  '#505262',
  '#6B6C7B',
  '#81828D',
  '#9D9EA4',
  '#C5C5C9',
  '#F7F7F8',
] as const

export const navyLightBase = [
  '#FCFCFD',
  '#F6F7F8',
  '#EBECEF',
  '#DBDCE1',
  '#C8C9D0',
  '#AEAFB7',
  '#8D8F9A',
  '#6A6B7C',
  '#494B5A',
  '#303240',
  '#1D1E2B',
  '#07080D',
] as const
