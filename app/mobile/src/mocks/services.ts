import type { Service } from '@/types/service'

export const SERVICES: Service[] = [
  {
    id: 'rank-boost',
    title: 'Rank Boost',
    category: 'Progression',
    rating: 4.8,
    badge: 'popular',
    price: 24.99,
    platform: 'PS5, Xbox, PC',
    duration: '24-48h',
    description:
      'We grind your character rank while you keep your account. Track progress live and chat with your operator the whole time, from kickoff to the final level-up.',
  },
  {
    id: 'heist-carry',
    title: 'Heist Carry',
    category: 'Heists',
    rating: 4.9,
    badge: 'popular',
    price: 39.99,
    platform: 'PS5, Xbox, PC',
    duration: '2-4h',
    description:
      'Our team carries you through the full heist setup and finale, maximizing payout with an optimized crew and route.',
  },
  {
    id: 'money-farming',
    title: 'Money Farming',
    category: 'Economy',
    rating: 4.6,
    badge: 'bestValue',
    price: 19.99,
    platform: 'PS5, Xbox, PC',
    duration: '12-24h',
    description:
      'A steady in-game cash injection farmed through safe, ToS-aware methods, delivered directly to your account.',
  },
  {
    id: 'vehicle-unlock',
    title: 'Vehicle Unlock',
    category: 'Collection',
    rating: 4.5,
    price: 14.99,
    platform: 'PS5, Xbox, PC',
    duration: '1-2h',
    description: 'Unlock a specific vehicle or full collection tier without grinding the prerequisite missions yourself.',
  },
  {
    id: 'account-leveling',
    title: 'Full Account Leveling',
    category: 'Progression',
    rating: 4.7,
    price: 59.99,
    platform: 'PS5, Xbox, PC',
    duration: '3-5 days',
    description:
      'End-to-end leveling of your account across rank, reputation and unlocks, paced to look natural and stay account-safe.',
  },
]

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((service) => service.id === id)
}
