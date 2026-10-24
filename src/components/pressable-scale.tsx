/* eslint-disable react-hooks/immutability */
import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export interface PressableScaleProps extends PressableProps {
  scaleTo?: number;
  haptic?: 'light' | 'selection' | 'none';
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);

export function PressableScale({
  scaleTo = 0.97,
  haptic = 'light',
  style,
  onPressIn,
  onPressOut,
  children,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: any) => {
    scale.value = withTiming(scaleTo, { duration: 120, easing: EASE_OUT });
    if (haptic === 'selection') {
      void Haptics.selectionAsync();
    } else if (haptic === 'light') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withTiming(1, { duration: 140, easing: EASE_OUT });
    onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      style={[style, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
