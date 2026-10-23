import React, { useState } from 'react';
import {
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { ThemedText } from './themed-text';

export type AlertType = 'success' | 'error';

export interface AlertBannerProps {
  type?: AlertType;
  message: string;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function AlertBanner({
  type = 'success',
  message,
  onDismiss,
  style,
  className = '',
}: AlertBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const isSuccess = type === 'success';

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const alertClasses = isSuccess
    ? 'bg-[#ECFDF5] border border-[#A7F3D0]'
    : 'bg-[#FEF2F2] border border-[#FECACA]';

  return (
    <View
      className={`flex-row items-center justify-between py-3 px-4 rounded-2xl ${alertClasses} ${className}`}
      style={style}
    >
      <View className="flex-row items-center flex-1 mr-2">
        <Ionicons
          name={isSuccess ? 'checkmark-circle' : 'alert-circle'}
          size={20}
          color={isSuccess ? colors.success : colors.error}
          className="mr-2"
        />
        <ThemedText
          variant="caption"
          color={colors.textPrimary}
          className="font-medium flex-1 ml-1"
        >
          {message}
        </ThemedText>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Dismiss alert"
        onPress={handleDismiss}
        className="p-1 active:opacity-60"
      >
        <Ionicons
          name="close"
          size={18}
          color={isSuccess ? colors.success : colors.error}
        />
      </Pressable>
    </View>
  );
}
