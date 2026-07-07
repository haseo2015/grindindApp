export const NAV_ITEMS = [
  { href: '/', icon: 'home' as const, labelKey: 'bottomNavigation.home' },
  { href: '/services', icon: 'list' as const, labelKey: 'bottomNavigation.services' },
  { href: '/cart', icon: 'cart' as const, labelKey: 'bottomNavigation.cart' },
  { href: '/profile', icon: 'person' as const, labelKey: 'bottomNavigation.profile' },
] as const
