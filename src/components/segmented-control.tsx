import React from 'react';
import {
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme';
import { ThemedText } from './themed-text';

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  style,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <View
      className={`flex-row items-center bg-surface-white rounded-full p-1 border border-border-gray self-start ${className}`}
      style={style}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(option.value)}
            className={`flex-row items-center py-2 px-4 rounded-full active:opacity-75 ${
              isSelected ? 'bg-text-primary' : 'bg-transparent'
            }`}
          >
            {option.icon ? <View className="mr-1.5">{option.icon}</View> : null}
            <ThemedText
              variant="caption"
              color={isSelected ? colors.surfaceWhite : colors.textPrimary}
              className="font-semibold"
            >
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}
