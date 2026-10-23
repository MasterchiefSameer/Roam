import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme';
import { ThemedText } from './themed-text';

export type BadgeVariant = 'favorite' | 'new' | 'discount' | 'superhost' | 'neutral';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const variantConfig: Record<BadgeVariant, { container: string; textColor: string }> = {
  favorite: {
    container: 'bg-[#FEF3C7] border border-[#FDE68A]',
    textColor: colors.badgeFavorite,
  },
  new: {
    container: 'bg-[#ECFDF5] border border-[#A7F3D0]',
    textColor: colors.badgeNew,
  },
  discount: {
    container: 'bg-[#F3E8FF] border border-[#E9D5FF]',
    textColor: colors.badgeDiscount,
  },
  superhost: {
    container: 'bg-[#EEF2FF] border border-[#C7D2FE]',
    textColor: colors.badgeSuperhost,
  },
  neutral: {
    container: 'bg-surface-gray',
    textColor: colors.textPrimary,
  },
};

export function Badge({
  label,
  variant = 'neutral',
  icon,
  style,
  className = '',
}: BadgeProps) {
  const current = variantConfig[variant];

  return (
    <View
      className={`flex-row items-center py-1 px-2.5 rounded-full self-start ${current.container} ${className}`}
      style={style}
    >
      {icon ? <View className="mr-1">{icon}</View> : null}
      <ThemedText
        variant="caption"
        color={current.textColor}
        className="font-semibold text-xs leading-4"
      >
        {label}
      </ThemedText>
    </View>
  );
}
