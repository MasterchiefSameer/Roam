import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Redirect } from 'expo-router';
import { colors } from '../../theme';
import { ThemedText, PressableScale } from '../../components';
import { useAuth } from '../../context/auth-context';

export default function TripsScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1 }} className="flex-1 bg-surface-white items-center justify-center">
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="flex-1 bg-surface-white">
      {/* Header */}
      <View className="px-5 pt-3 pb-3 border-b border-border-gray/40">
        <ThemedText variant="display" className="text-2xl font-black text-text-primary tracking-tight">
          Trips
        </ThemedText>
      </View>

      {/* Trips Content */}
      <View className="flex-1 items-center justify-center px-6 gap-4 pb-20">
        <View className="w-20 h-20 rounded-full bg-surface-gray items-center justify-center border border-border-gray/50 shadow-sm">
          <Ionicons name="calendar-outline" size={38} color={colors.textPrimary} />
        </View>

        <View className="items-center gap-1.5">
          <ThemedText variant="title" className="text-2xl font-bold text-text-primary text-center">
            No upcoming trips
          </ThemedText>
          <ThemedText
            variant="body"
            color={colors.textSecondary}
            className="text-center text-sm leading-5 max-w-[280px]"
          >
            When you book a stay on Roam, your reservation details, check-in guide, and host messages will appear here.
          </ThemedText>
        </View>

        <PressableScale
          scaleTo={0.96}
          haptic="light"
          onPress={() => router.push('/home')}
          accessibilityRole="button"
          accessibilityLabel="Explore stays"
          className="mt-3 bg-text-primary px-7 py-3.5 rounded-full shadow-sm"
        >
          <ThemedText variant="caption" className="text-white font-bold text-sm">
            Explore stays
          </ThemedText>
        </PressableScale>
      </View>
    </SafeAreaView>
  );
}
