import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../theme';
import { ThemedText } from '../../components';
import { useAuth } from '../../context/auth-context';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, signInWithSocial } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await signUp(fullName.trim() || 'Guest User', email.trim(), password);
      router.push('/(auth)/verify');
    } catch {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    setLoading(true);
    try {
      await signInWithSocial(provider);
      router.replace('/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-surface-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        className="flex-1"
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          contentContainerClassName="px-6 py-4 flex-grow justify-between"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            {/* Top Navigation Bar */}
            <View className="flex-row items-center justify-between mb-8">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={() => router.back()}
                className="w-11 h-11 rounded-full border border-border-gray items-center justify-center active:bg-surface-gray"
              >
                <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
              </Pressable>

              <ThemedText variant="title" className="text-2xl font-black text-text-primary tracking-tight">
                roam
              </ThemedText>
            </View>

            {/* Header Titles */}
            <View className="mb-8">
              <ThemedText variant="display" className="text-[34px] leading-[38px] font-black text-text-primary tracking-tight">
                Create{'\n'}your account
              </ThemedText>
              <ThemedText variant="body" color={colors.textSecondary} className="text-[15px] leading-5 mt-2.5">
                Join roam to save your stays, get personalized recommendations and access them across all your devices.
              </ThemedText>
            </View>

            {/* Error Banner */}
            {error ? (
              <View className="bg-status-error-bg border border-status-error-border rounded-xl p-3 mb-4">
                <ThemedText variant="caption" color={colors.error} className="font-medium text-xs">
                  {error}
                </ThemedText>
              </View>
            ) : null}

            {/* Form Fields */}
            <View className="gap-3.5 mb-6">
              {/* Full Name Field */}
              <View className="bg-surface-gray rounded-2xl px-4 py-2.5 min-h-[60px] flex-row items-center gap-3.5 border border-transparent focus:border-lavender">
                <Ionicons name="person-outline" size={22} color={colors.textPrimary} />
                <View className="flex-1">
                  <ThemedText variant="caption" color={colors.textPrimary} className="font-semibold text-xs leading-4">
                    Full name
                  </ThemedText>
                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="e.g. Adrian Hajdin"
                    placeholderTextColor={colors.textSecondary}
                    className="text-sm font-medium text-text-primary p-0 m-0"
                    autoCapitalize="words"
                  />
                </View>
              </View>

              {/* Email Address Field */}
              <View className="bg-surface-gray rounded-2xl px-4 py-2.5 min-h-[60px] flex-row items-center gap-3.5 border border-transparent focus:border-lavender">
                <Ionicons name="mail-outline" size={22} color={colors.textPrimary} />
                <View className="flex-1">
                  <ThemedText variant="caption" color={colors.textPrimary} className="font-semibold text-xs leading-4">
                    Email address
                  </ThemedText>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    placeholderTextColor={colors.textSecondary}
                    className="text-sm font-medium text-text-primary p-0 m-0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Field */}
              <View className="bg-surface-gray rounded-2xl px-4 py-2.5 min-h-[60px] flex-row items-center gap-3.5 border border-transparent focus:border-lavender">
                <Ionicons name="lock-closed-outline" size={22} color={colors.textPrimary} />
                <View className="flex-1">
                  <ThemedText variant="caption" color={colors.textPrimary} className="font-semibold text-xs leading-4">
                    Password
                  </ThemedText>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="At least 8 characters"
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry={!showPassword}
                    className="text-sm font-medium text-text-primary p-0 m-0"
                    autoCapitalize="none"
                  />
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="p-1 active:opacity-60"
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={colors.textPrimary}
                  />
                </Pressable>
              </View>
            </View>

            {/* Create Account Primary Button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Create account"
              disabled={loading}
              onPress={handleSignUp}
              className="bg-primary-yellow rounded-full py-4 px-6 items-center justify-center flex-row active:opacity-85 active:scale-[0.985] shadow-sm mb-6"
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.textPrimary} />
              ) : (
                <>
                  <ThemedText variant="button" className="font-bold text-base text-text-primary mr-2">
                    Create account
                  </ThemedText>
                  <Feather name="arrow-right" size={18} color={colors.textPrimary} />
                </>
              )}
            </Pressable>

            {/* "or" Divider */}
            <View className="flex-row items-center my-2 gap-3">
              <View className="flex-1 h-[1px] bg-border-gray" />
              <ThemedText variant="caption" color={colors.textSecondary} className="text-xs font-medium">
                or
              </ThemedText>
              <View className="flex-1 h-[1px] bg-border-gray" />
            </View>

            {/* Social Buttons */}
            <View className="gap-3 mt-4">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Continue with Google"
                disabled={loading}
                onPress={() => handleSocialAuth('google')}
                className="bg-surface-white rounded-full py-3.5 px-6 border border-border-gray flex-row items-center justify-center gap-3 active:opacity-80 active:scale-[0.985] shadow-sm"
              >
                <Ionicons name="logo-google" size={19} color="#EA4335" />
                <ThemedText variant="button" className="font-semibold text-[15px] text-text-primary">
                  Continue with Google
                </ThemedText>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Continue with Apple"
                disabled={loading}
                onPress={() => handleSocialAuth('apple')}
                className="bg-surface-white rounded-full py-3.5 px-6 border border-border-gray flex-row items-center justify-center gap-3 active:opacity-80 active:scale-[0.985] shadow-sm"
              >
                <Ionicons name="logo-apple" size={21} color="#000000" />
                <ThemedText variant="button" className="font-semibold text-[15px] text-text-primary">
                  Continue with Apple
                </ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Footer Sign-in Link */}
          <View className="flex-row items-center justify-center mt-10 mb-4">
            <ThemedText variant="body" color={colors.textSecondary} className="text-sm">
              Already have an account?{' '}
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sign in"
              onPress={() => router.push('/(auth)/sign-in')}
            >
              <ThemedText variant="body" className="text-sm font-bold text-text-primary underline">
                Sign in
              </ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
