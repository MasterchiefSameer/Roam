import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme';
import { ThemedText } from './themed-text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-yellow',
  secondary: 'bg-surface-white border border-border-gray',
  ghost: 'bg-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 min-h-[40px]',
  md: 'py-3.5 px-6 min-h-[52px]',
  lg: 'py-4 px-8 min-h-[58px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  title,
  loading = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  style,
  className = '',
  onPress,
  accessibilityLabel,
}: ButtonProps) {
  const textVariant = size === 'sm' ? 'caption' : 'button';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      className={`rounded-full flex-row items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? 'opacity-40' : 'active:opacity-85 active:scale-[0.985]'
      } ${className}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.textPrimary} />
      ) : (
        <View className="flex-row items-center justify-center">
          {leadingIcon ? <View className="mr-2">{leadingIcon}</View> : null}
          <ThemedText
            variant={textVariant}
            color={colors.textPrimary}
            className="font-semibold"
          >
            {title}
          </ThemedText>
          {trailingIcon ? <View className="ml-2">{trailingIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}
