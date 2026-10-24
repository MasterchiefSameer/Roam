import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter, Redirect } from 'expo-router';
import { colors } from '../../theme';
import { ThemedText, Badge, ProfileRow, PressableScale } from '../../components';
import { useAuth } from '../../context/auth-context';

function getInitials(fullName?: string, email?: string): string {
  const name = fullName?.trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return 'RO';
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isSignedIn, isLoaded, signOut } = useAuth();
  const [avatarError, setAvatarError] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

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

  const displayName = user?.fullName || 'Traveler';
  const displayEmail = user?.email || 'guest@example.com';
  const avatarUrl = user?.avatarUrl;
  const initials = getInitials(displayName, displayEmail);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="flex-1 bg-surface-white">
      {/* Header */}
      <View className="px-5 pt-3 pb-3 border-b border-border-gray/40 flex-row items-center justify-between">
        <ThemedText variant="display" className="text-2xl font-black text-text-primary tracking-tight">
          Profile
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View design system"
          onPress={() => router.push('/design-system')}
          className="bg-surface-gray py-1.5 px-3.5 rounded-full border border-border-gray/50 active:opacity-75"
        >
          <ThemedText variant="caption" color={colors.textPrimary} className="font-semibold text-xs">
            Design System
          </ThemedText>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="px-5 pt-5 pb-28 gap-5"
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-4">
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 rounded-full p-[2.5px] bg-[#FCD34D] items-center justify-center shadow-sm relative">
              <View className="w-full h-full rounded-full overflow-hidden bg-surface-white items-center justify-center">
                {avatarUrl && !avatarError ? (
                  <Image
                    source={{ uri: avatarUrl }}
                    style={{ width: '100%', height: '100%', borderRadius: 9999 }}
                    contentFit="cover"
                    transition={200}
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <ThemedText className="font-extrabold text-[#111827] text-lg">
                    {initials}
                  </ThemedText>
                )}
              </View>

              {user?.isGoogleUser ? (
                <View className="absolute -bottom-0.5 -right-0.5 w-[22px] h-[22px] rounded-full bg-white items-center justify-center border border-border-gray shadow-sm">
                  <Ionicons name="logo-google" size={12} color="#EA4335" />
                </View>
              ) : null}
            </View>
            <View className="flex-1">
              <ThemedText variant="title" className="font-bold text-lg text-text-primary">
                {displayName}
              </ThemedText>
              <ThemedText variant="caption" color={colors.textSecondary} className="text-xs mt-0.5">
                {displayEmail}
              </ThemedText>
              <View className="flex-row items-center gap-2 mt-2">
                <Badge label="Clerk Verified" variant="superhost" />
                {user?.isGoogleUser ? (
                  <Badge label="Google Connected" variant="favorite" />
                ) : null}
              </View>
            </View>
          </View>
        </View>

        {/* Account Menu Section */}
        <View className="bg-surface-white rounded-3xl border border-border-gray shadow-sm overflow-hidden">
          <ProfileRow
            icon={<Ionicons name="person-outline" size={20} color={colors.textPrimary} />}
            label="Personal information"
            showDivider
            onPress={() => {}}
          />
          <ProfileRow
            icon={<Ionicons name="heart-outline" size={20} color={colors.textPrimary} />}
            label="Saved stays & favorites"
            showDivider
            onPress={() => {}}
          />
          <ProfileRow
            icon={<Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />}
            label="Notifications"
            showDivider
            onPress={() => {}}
          />
          <ProfileRow
            icon={<Ionicons name="color-palette-outline" size={20} color={colors.textPrimary} />}
            label="Roam Design System"
            showDivider
            onPress={() => router.push('/design-system')}
          />
          <ProfileRow
            icon={<Ionicons name="shield-checkmark-outline" size={20} color={colors.textPrimary} />}
            label="Privacy & Security"
            onPress={() => {}}
          />
        </View>

        {/* Support & Legal */}
        <View className="bg-surface-white rounded-3xl border border-border-gray shadow-sm overflow-hidden">
          <ProfileRow
            icon={<Ionicons name="help-circle-outline" size={20} color={colors.textPrimary} />}
            label="Get help & support"
            showDivider
            onPress={() => {}}
          />
          <ProfileRow
            icon={<Ionicons name="document-text-outline" size={20} color={colors.textPrimary} />}
            label="Terms of service"
            onPress={() => {}}
          />
        </View>

        {/* Sign Out Button */}
        <PressableScale
          scaleTo={0.97}
          haptic="light"
          onPress={handleSignOut}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
          className="bg-surface-gray py-4 px-5 rounded-2xl border border-border-gray/60 flex-row items-center justify-center gap-2 active:opacity-70 mt-2"
        >
          <Feather name="log-out" size={17} color={colors.error} />
          <ThemedText variant="body" color={colors.error} className="font-bold text-sm">
            Sign out
          </ThemedText>
        </PressableScale>

        <ThemedText variant="caption" color={colors.textSecondary} className="text-center text-xs text-text-secondary/70">
          Roam v1.0.0 · Signed in via Clerk
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}
