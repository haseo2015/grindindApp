export type StarIcon = 'star' | 'star-half' | 'star-outline'

export function getStarIcons(rating: number): StarIcon[] {
  const rounded = Math.round(rating * 2) / 2

  return Array.from({ length: 5 }, (_, index) => {
    const diff = rounded - index

    if (diff >= 1) return 'star'
    if (diff >= 0.5) return 'star-half'
    return 'star-outline'
  })
}
