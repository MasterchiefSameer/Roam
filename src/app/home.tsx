import React from 'react';
import {
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter, Redirect } from 'expo-router';
import { colors } from '../theme';
import { ThemedText, ListingCard, Badge } from '../components';
import { useAuth } from '../context/auth-context';

export default function HomeScreen() {
  const router = useRouter();
  const { user, isSignedIn, isLoaded, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  if (!isLoaded) {
    return (
      <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-surface-gray items-center justify-center">
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const displayName = user?.fullName || 'Traveler';
  const displayEmail = user?.email || 'guest@example.com';

  return (
    <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-surface-gray">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="p-5 gap-5 pb-16"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View className="flex-row items-center justify-between">
          <ThemedText variant="display" className="text-3xl font-black text-text-primary tracking-tight">
            roam
          </ThemedText>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View design system"
            onPress={() => router.push('/design-system')}
            className="bg-surface-white py-1.5 px-3.5 rounded-full border border-border-gray shadow-sm active:opacity-75"
          >
            <ThemedText variant="caption" color={colors.textPrimary} className="font-semibold text-xs">
              Design System
            </ThemedText>
          </Pressable>
        </View>

        {/* User Session Banner Card */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-full bg-lavender/40 items-center justify-center">
                <Ionicons name="person" size={24} color={colors.textPrimary} />
              </View>
              <View>
                <ThemedText variant="title" className="font-bold text-lg text-text-primary">
                  {displayName}
                </ThemedText>
                <ThemedText variant="caption" color={colors.textSecondary} className="text-xs">
                  {displayEmail}
                </ThemedText>
              </View>
            </View>

            <Badge label="Clerk Session" variant="superhost" />
          </View>

          <View className="h-[1px] bg-border-gray my-1" />

          <View className="flex-row items-center justify-between">
            <ThemedText variant="caption" color={colors.textSecondary} className="text-xs">
              Status: <ThemedText variant="caption" color={colors.success} className="font-bold">Signed in</ThemedText>
            </ThemedText>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sign out"
              onPress={handleSignOut}
              className="bg-surface-gray py-2 px-4 rounded-full flex-row items-center gap-1.5 active:opacity-70"
            >
              <Feather name="log-out" size={15} color={colors.error} />
              <ThemedText variant="caption" color={colors.error} className="font-bold text-xs">
                Sign out
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Featured Stay Preview */}
        <View className="gap-2">
          <ThemedText variant="title" className="text-xl font-bold text-text-primary">
            Saved Stays
          </ThemedText>
          <ThemedText variant="caption" color={colors.textSecondary} className="text-sm">
            Handpicked stays waiting for your next trip.
          </ThemedText>

          <View className="mt-2">
            <ListingCard
              imageUri="https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=800&auto=format&fit=crop"
              title="Modern Cabin with Hot Tub"
              location="Lake Arrowhead, CA"
              rating={4.9}
              reviewCount={342}
              pricePerNight={280}
              isFavorite
              amenities={[
                { label: 'Hot Tub', iconName: 'water-outline' },
                { label: 'Pet Friendly', iconName: 'paw-outline' },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
