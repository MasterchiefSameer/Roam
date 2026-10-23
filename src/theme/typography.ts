import { TextStyle } from 'react-native';
import { colors } from './colors';

export const fontFamilies = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const typography = {
  display: {
    fontSize: 56,
    lineHeight: 58,
    fontFamily: fontFamilies.bold,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -1,
  },
  heading: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fontFamilies.bold,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: fontFamilies.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamilies.regular,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.medium,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  button: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: fontFamilies.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
