export const shadows = {
  card: '0 2px 8px rgba(11, 11, 26, 0.04)',
  raised: '0 4px 16px rgba(11, 11, 26, 0.08)',
  glass: '0 8px 32px rgba(11, 11, 26, 0.08)',
} as const;

export type ThemeShadows = typeof shadows;
