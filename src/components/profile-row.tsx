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

export interface ProfileRowItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

export interface ProfileRowProps {
  icon: React.ReactNode;
  label: string;
  showDivider?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function ProfileRow({
  icon,
  label,
  showDivider = false,
  onPress,
  style,
  className = '',
}: ProfileRowProps) {
  return (
    <View style={style} className={className}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        className="flex-row items-center justify-between p-4 active:bg-surface-gray"
      >
        <View className="flex-row items-center gap-3.5">
          <View className="w-6 items-center">{icon}</View>
          <ThemedText variant="body" color={colors.textPrimary} className="font-medium text-base">
            {label}
          </ThemedText>
        </View>

        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      </Pressable>

      {showDivider ? <View className="h-[1px] bg-border-gray ml-14" /> : null}
    </View>
  );
}

export interface ProfileGroupProps {
  items: ProfileRowItem[];
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function ProfileGroup({ items, style, className = '' }: ProfileGroupProps) {
  return (
    <View className={`bg-surface-white rounded-2xl border border-border-gray overflow-hidden ${className}`} style={style}>
      {items.map((item, index) => (
        <ProfileRow
          key={item.id}
          icon={item.icon}
          label={item.label}
          onPress={item.onPress}
          showDivider={index < items.length - 1}
        />
      ))}
    </View>
  );
}
