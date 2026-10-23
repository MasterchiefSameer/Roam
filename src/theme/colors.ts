export const colors = {
  // Brand Palette from Design Reference (02. Color palette)
  primaryYellow: '#FFC629',
  lavender: '#C9B4FF',
  textPrimary: '#0B0B1A',
  textSecondary: '#6B7280',
  surfaceWhite: '#FFFFFF',
  surfaceGray: '#F4F5F7',
  borderGray: '#E5E7EB',
  glassBlur: 'rgba(255, 255, 255, 0.7)',

  // Semantic & Feedback Colors (14. Status / Alerts & 15. Tags / Badges)
  success: '#059669',
  successBg: '#ECFDF5',
  successBorder: '#A7F3D0',

  error: '#DC2626',
  errorBg: '#FEF2F2',
  errorBorder: '#FECACA',

  badgeFavorite: '#B45309',
  badgeFavoriteBg: '#FEF3C7',
  badgeFavoriteBorder: '#FDE68A',

  badgeDiscount: '#9333EA',
  badgeDiscountBg: '#F3E8FF',
  badgeDiscountBorder: '#E9D5FF',

  badgeSuperhost: '#4F46E5',
  badgeSuperhostBg: '#EEF2FF',
  badgeSuperhostBorder: '#C7D2FE',

  badgeNew: '#059669',
  badgeNewBg: '#ECFDF5',
  badgeNewBorder: '#A7F3D0',
} as const;

export type ThemeColors = typeof colors;
