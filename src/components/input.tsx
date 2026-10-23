import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export interface InputProps extends TextInputProps {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  containerClassName?: string;
  pill?: boolean;
}

export function Input({
  leadingIcon,
  trailingIcon,
  isPassword = false,
  containerStyle,
  containerClassName = '',
  pill = false,
  onFocus,
  onBlur,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const borderShape = pill ? 'rounded-full' : 'rounded-2xl';
  const stateClasses = isFocused
    ? 'bg-surface-white border-2 border-lavender'
    : 'bg-surface-gray border border-transparent';

  return (
    <View
      className={`flex-row items-center px-4 min-h-[52px] ${borderShape} ${stateClasses} ${containerClassName}`}
      style={containerStyle}
    >
      {leadingIcon ? <View className="mr-3">{leadingIcon}</View> : null}

      <TextInput
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={isPassword && !showPassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="flex-1 text-base font-body text-text-primary py-0"
        style={style}
        {...props}
      />

      {isPassword ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          onPress={() => setShowPassword((prev) => !prev)}
          className="ml-3 p-1 active:opacity-60"
        >
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>
      ) : trailingIcon ? (
        <View className="ml-3">{trailingIcon}</View>
      ) : null}
    </View>
  );
}

export interface SearchInputProps extends Omit<InputProps, 'leadingIcon' | 'trailingIcon'> {
  onFilterPress?: () => void;
}

export function SearchInput({ onFilterPress, ...props }: SearchInputProps) {
  return (
    <Input
      pill
      placeholder="Cabins in California"
      leadingIcon={<Feather name="search" size={20} color={colors.textPrimary} />}
      trailingIcon={
        onFilterPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Filter options"
            onPress={onFilterPress}
            className="active:opacity-70"
          >
            <Ionicons name="options-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        ) : (
          <Ionicons name="options-outline" size={20} color={colors.textPrimary} />
        )
      }
      {...props}
    />
  );
}
