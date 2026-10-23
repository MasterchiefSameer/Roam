import React from 'react';
import {
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';
import { ThemedText } from './themed-text';

export interface StepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function Stepper({
  value,
  min = 1,
  max = 99,
  onChange,
  style,
  className = '',
}: StepperProps) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View
      className={`flex-row items-center bg-surface-gray rounded-full p-1 self-start ${className}`}
      style={style}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Decrease value"
        accessibilityState={{ disabled: !canDecrement }}
        disabled={!canDecrement}
        onPress={() => onChange(value - 1)}
        className={`w-8 h-8 rounded-full items-center justify-center bg-surface-white ${
          canDecrement ? 'active:opacity-70' : 'opacity-40'
        }`}
      >
        <Feather
          name="minus"
          size={16}
          color={canDecrement ? colors.textPrimary : colors.borderGray}
        />
      </Pressable>

      <View className="px-3 min-w-[32px] items-center">
        <ThemedText
          variant="caption"
          color={colors.textPrimary}
          className="font-bold text-base"
        >
          {value}
        </ThemedText>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increase value"
        accessibilityState={{ disabled: !canIncrement }}
        disabled={!canIncrement}
        onPress={() => onChange(value + 1)}
        className={`w-8 h-8 rounded-full items-center justify-center bg-surface-white ${
          canIncrement ? 'active:opacity-70' : 'opacity-40'
        }`}
      >
        <Feather
          name="plus"
          size={16}
          color={canIncrement ? colors.textPrimary : colors.borderGray}
        />
      </Pressable>
    </View>
  );
}
