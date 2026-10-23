import React from 'react';
import {
  Pressable,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme';
import { ThemedText } from './themed-text';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function FilterChip({
  label,
  selected = false,
  onPress,
  style,
  className = '',
}: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`rounded-full py-2.5 px-5 items-center justify-center active:opacity-80 active:scale-95 ${
        selected ? 'bg-lavender' : 'bg-surface-gray'
      } ${className}`}
      style={style}
    >
      <ThemedText
        variant="caption"
        color={colors.textPrimary}
        className="font-semibold"
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

export interface CategoryChipProps {
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function CategoryChip({
  label,
  icon,
  selected = false,
  onPress,
  style,
  className = '',
}: CategoryChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`rounded-full flex-row items-center py-2.5 px-4 active:opacity-80 active:scale-95 ${
        selected ? 'bg-primary-yellow' : 'bg-surface-white border border-border-gray'
      } ${className}`}
      style={style}
    >
      <View className="mr-1.5">{icon}</View>
      <ThemedText
        variant="caption"
        color={colors.textPrimary}
        className="font-semibold"
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}
