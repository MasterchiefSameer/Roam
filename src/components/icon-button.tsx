import React from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface IconButtonProps {
  icon: React.ReactNode;
  onPress?: () => void;
  size?: number;
  variant?: 'surface' | 'outline' | 'ghost';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
  accessibilityLabel: string;
}

const variantClasses = {
  outline: 'bg-surface-white border border-border-gray',
  surface: 'bg-surface-gray',
  ghost: 'bg-transparent',
};

export function IconButton({
  icon,
  onPress,
  size = 48,
  variant = 'outline',
  disabled = false,
  style,
  className = '',
  accessibilityLabel,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`rounded-full items-center justify-center ${variantClasses[variant]} ${
        disabled ? 'opacity-40' : 'active:opacity-80 active:scale-95'
      } ${className}`}
      style={[{ width: size, height: size }, style]}
    >
      {icon}
    </Pressable>
  );
}
