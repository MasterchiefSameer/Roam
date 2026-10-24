import React, { useState, useRef, useEffect } from 'react';
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

export default function VerifyScreen() {
  const router = useRouter();
  const { pendingEmail, verifyEmail, resendVerificationCode } = useAuth();

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [activeCell, setActiveCell] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(45);

  const inputRefs = useRef<any[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleDigitChange = (text: string, index: number) => {
    // Take only the last character or sanitize
    const cleanChar = text.replace(/[^0-9]/g, '').slice(-1);

    const newDigits = [...digits];
    newDigits[index] = cleanChar;
    setDigits(newDigits);
    setError(null);

    if (cleanChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveCell(index + 1);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveCell(index - 1);
    }
  };

  const handleVerify = async () => {
    const fullCode = digits.join('');
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await verifyEmail(fullCode);
      if (result.success) {
        router.replace('/home');
      } else {
        setError(result.error || 'Invalid code. Please try again or resend.');
      }
    } catch {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer === 0) {
      setError(null);
      const res = await resendVerificationCode();
      if (res.success) {
        setTimer(45);
      } else {
        setError(res.error || 'Failed to resend code. Please try again.');
      }
    }
  };

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

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
                Verify your{'\n'}email
              </ThemedText>
              <ThemedText variant="body" color={colors.textSecondary} className="text-[15px] leading-5 mt-2.5">
                {"We've sent a 6-digit code to "}
                <ThemedText variant="body" color={colors.textPrimary} className="font-semibold text-[15px]">
                  {pendingEmail || 'your email'}
                </ThemedText>
                {'. Enter it below to complete your registration.'}
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

            {/* 6-Digit OTP Cells */}
            <View className="flex-row justify-between mb-6">
              {digits.map((digit, index) => {
                const isFocused = activeCell === index;
                return (
                  <TextInput
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    value={digit}
                    onChangeText={(val) => handleDigitChange(val, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setActiveCell(index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    className={`w-12 h-14 rounded-2xl text-center text-xl font-bold text-text-primary ${
                      isFocused
                        ? 'bg-surface-white border-2 border-lavender'
                        : 'bg-surface-gray border border-transparent'
                    }`}
                  />
                );
              })}
            </View>

            {/* Clerk Test Code Hint */}
            {/* <View className="bg-surface-gray rounded-xl p-3 mb-8 flex-row items-center justify-between">
              <ThemedText variant="caption" color={colors.textSecondary} className="text-xs">
                Clerk mock test code:
              </ThemedText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Fill test code 424242"
                onPress={() => setDigits(['4', '2', '4', '2', '4', '2'])}
                className="bg-lavender/30 py-1 px-2.5 rounded-lg active:opacity-75"
              >
                <ThemedText variant="caption" color={colors.textPrimary} className="font-bold text-xs">
                  424242 (Tap to fill)
                </ThemedText>
              </Pressable>
            </View> */}

            {/* Verify and Continue Primary Button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Verify and continue"
              disabled={loading}
              onPress={handleVerify}
              className="bg-primary-yellow rounded-full py-4 px-6 items-center justify-center flex-row active:opacity-85 active:scale-[0.985] shadow-sm mb-6"
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.textPrimary} />
              ) : (
                <>
                  <ThemedText variant="button" className="font-bold text-base text-text-primary mr-2">
                    Verify and continue
                  </ThemedText>
                  <Feather name="arrow-right" size={18} color={colors.textPrimary} />
                </>
              )}
            </Pressable>

            {/* Resend Code Section */}
            <View className="flex-row items-center justify-center gap-1.5 mt-2">
              <ThemedText variant="body" color={colors.textSecondary} className="text-sm">
                {"Didn't receive code?"}
              </ThemedText>
              {timer > 0 ? (
                <ThemedText variant="body" color={colors.textSecondary} className="text-sm font-semibold">
                  Resend in {formattedTimer}
                </ThemedText>
              ) : (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Resend code"
                  onPress={handleResend}
                >
                  <ThemedText variant="body" className="text-sm font-bold text-text-primary underline">
                    Resend code
                  </ThemedText>
                </Pressable>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
