import React from 'react';
import {
  Switch,
  SwitchProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme';

export interface ToggleProps extends Omit<SwitchProps, 'trackColor' | 'thumbColor'> {
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function Toggle({ value, onValueChange, style, className, ...props }: ToggleProps) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: colors.borderGray,
        true: colors.primaryYellow,
      }}
      thumbColor={colors.surfaceWhite}
      ios_backgroundColor={colors.borderGray}
      className={className}
      style={style}
      {...props}
    />
  );
}
