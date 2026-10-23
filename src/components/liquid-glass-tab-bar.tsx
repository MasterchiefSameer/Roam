import React from 'react';
import {
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { ThemedText } from './themed-text';

export type TabKey = 'home' | 'search' | 'trips' | 'profile';

export interface TabItem {
  key: TabKey;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  activeIconName: keyof typeof Ionicons.glyphMap;
}

export interface LiquidGlassTabBarProps {
  activeTab?: TabKey;
  onTabChange?: (tab: TabKey) => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const TABS: TabItem[] = [
  { key: 'home', label: 'Home', iconName: 'home-outline', activeIconName: 'home' },
  { key: 'search', label: 'Search', iconName: 'search-outline', activeIconName: 'search' },
  { key: 'trips', label: 'Trips', iconName: 'calendar-outline', activeIconName: 'calendar' },
  { key: 'profile', label: 'Profile', iconName: 'person-outline', activeIconName: 'person' },
];

export function LiquidGlassTabBar({
  activeTab = 'home',
  onTabChange,
  style,
  className = '',
}: LiquidGlassTabBarProps) {
  return (
    <View className={`items-center justify-center w-full ${className}`} style={style}>
      <View className="flex-row items-center justify-between bg-white/90 rounded-full px-2 py-1.5 border border-white shadow-md w-full max-w-[380px]">
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => onTabChange?.(tab.key)}
              className="flex-1 items-center justify-center"
            >
              {isActive ? (
                <View className="items-center justify-center bg-primary-yellow py-1.5 px-4 rounded-full min-w-[68px] shadow-sm">
                  <Ionicons name={tab.activeIconName} size={20} color={colors.textPrimary} />
                  <ThemedText
                    variant="caption"
                    color={colors.textPrimary}
                    className="font-bold text-[11px] leading-3.5 mt-0.5"
                  >
                    {tab.label}
                  </ThemedText>
                </View>
              ) : (
                <View className="items-center justify-center py-1">
                  <Ionicons name={tab.iconName} size={22} color={colors.textSecondary} />
                  <ThemedText
                    variant="caption"
                    color={colors.textSecondary}
                    className="font-medium text-[11px] leading-3.5 mt-0.5"
                  >
                    {tab.label}
                  </ThemedText>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
