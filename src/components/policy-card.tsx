import React from 'react';
import {
  Pressable,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { ThemedText } from './themed-text';

export interface PolicyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function PolicyCard({
  icon,
  title,
  description,
  onPress,
  style,
  className = '',
}: PolicyCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`flex-row items-center bg-surface-white rounded-2xl p-4 border border-border-gray active:opacity-80 ${className}`}
      style={style}
    >
      <View className="w-11 h-11 rounded-xl bg-[#F3EEFF] items-center justify-center mr-3.5">
        {icon}
      </View>

      <View className="flex-1 gap-0.5">
        <ThemedText variant="title" className="text-base font-bold leading-5">
          {title}
        </ThemedText>
        <ThemedText variant="caption" color={colors.textSecondary} className="text-xs leading-4">
          {description}
        </ThemedText>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.lavender}
        className="ml-2"
      />
    </Pressable>
  );
}
