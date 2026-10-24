import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter, Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme';
import { ThemedText, PressableScale } from '../../components';
import { useAuth } from '../../context/auth-context';
import { STAYS_DATA, StayCategory } from '../../data/stays';

interface CategoryOption {
  key: StayCategory;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const ROW_1_CATEGORIES: CategoryOption[] = [
  { key: 'all', label: 'All Stays', iconName: 'home' },
  { key: 'cabins', label: 'Cabins', iconName: 'triangle' },
  { key: 'beach', label: 'Beach', iconName: 'water' },
];

const ROW_2_CATEGORIES: CategoryOption[] = [
  { key: 'city', label: 'City', iconName: 'business' },
  { key: 'villas', label: 'Villas', iconName: 'leaf' },
];

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

export default function HomeScreen() {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<StayCategory>('all');
  const [avatarError, setAvatarError] = useState(false);

  const initials = getInitials(user?.fullName, user?.email);

  const filteredStays = useMemo(() => {
    if (selectedCategory === 'all') {
      return STAYS_DATA;
    }
    return STAYS_DATA.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

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

  const greetingName = user?.fullName?.split(' ')[0] || 'Joanna';

  const handleOpenSearch = (initialQuery?: string) => {
    if (initialQuery) {
      router.push({
        pathname: '/search',
        params: { q: initialQuery },
      });
    } else {
      router.push('/search');
    }
  };

  const renderCategoryChip = (cat: CategoryOption) => {
    const isSelected = selectedCategory === cat.key;
    return (
      <PressableScale
        key={cat.key}
        haptic="selection"
        scaleTo={0.95}
        onPress={() => setSelectedCategory(cat.key)}
        accessibilityRole="button"
        accessibilityLabel={`Filter by ${cat.label}`}
        className={`flex-row items-center gap-2 px-4 py-2.5 rounded-full ${
          isSelected
            ? 'bg-primary-yellow shadow-sm'
            : 'bg-surface-gray border border-border-gray/30'
        }`}
      >
        <Ionicons
          name={cat.iconName}
          size={16}
          color={isSelected ? '#111827' : colors.textPrimary}
        />
        <ThemedText
          variant="caption"
          className={`text-sm ${
            isSelected
              ? 'font-bold text-text-primary'
              : 'font-semibold text-text-primary'
          }`}
        >
          {cat.label}
        </ThemedText>
      </PressableScale>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="flex-1 bg-surface-white">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="px-5 pt-3 pb-28 gap-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Bar */}
        <View className="flex-row items-center justify-between">
          <ThemedText
            variant="display"
            className="text-[34px] font-black text-text-primary tracking-tighter"
          >
            roam
          </ThemedText>

          {/* User Avatar with Golden Accent Ring */}
          <PressableScale
            scaleTo={0.92}
            onPress={() => router.push('/profile')}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            className="w-[52px] h-[52px] rounded-full p-[3px] bg-[#FCD34D] items-center justify-center shadow-sm relative"
          >
            <View className="w-full h-full rounded-full overflow-hidden bg-surface-white items-center justify-center">
              {user?.avatarUrl && !avatarError ? (
                <Image
                  source={{ uri: user.avatarUrl }}
                  style={{ width: '100%', height: '100%', borderRadius: 9999 }}
                  contentFit="cover"
                  transition={200}
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <ThemedText className="font-extrabold text-[#111827] text-base">
                  {initials}
                </ThemedText>
              )}
            </View>

            {/* Google OAuth mini badge */}
            {user?.isGoogleUser ? (
              <View className="absolute -bottom-0.5 -right-0.5 w-[20px] h-[20px] rounded-full bg-white items-center justify-center border border-border-gray shadow-sm">
                <Ionicons name="logo-google" size={11} color="#EA4335" />
              </View>
            ) : null}
          </PressableScale>
        </View>

        {/* Greeting & Headline with Squircle Search Trigger */}
        <View className="flex-row items-end justify-between pt-1">
          <View className="flex-1 pr-3">
            <ThemedText
              variant="body"
              color={colors.textSecondary}
              className="text-base font-medium mb-1"
            >
              Hey, {greetingName} 👋
            </ThemedText>
            <ThemedText
              variant="display"
              className="text-[38px] leading-[42px] font-black text-text-primary tracking-tight"
            >
              Find your{'\n'}next stay
            </ThemedText>
          </View>

          {/* Squircle Search Icon Button */}
          <PressableScale
            scaleTo={0.92}
            haptic="light"
            onPress={() => handleOpenSearch()}
            accessibilityRole="button"
            accessibilityLabel="Search stays"
            className="w-14 h-14 rounded-2xl bg-surface-gray items-center justify-center border border-border-gray/60 shadow-sm"
          >
            <Ionicons name="search" size={23} color={colors.textPrimary} />
          </PressableScale>
        </View>

        {/* Natural Language Prompt Search Banner (Lavender Pill) */}
        <PressableScale
          scaleTo={0.98}
          haptic="light"
          onPress={() => handleOpenSearch('quiet pet friendly cabin with hot tub')}
          accessibilityRole="button"
          accessibilityLabel="Search: quiet pet friendly cabin with hot tub"
          className="bg-[#D8B4FE] rounded-full px-4 py-3 flex-row items-center justify-between shadow-sm"
        >
          <View className="flex-row items-center gap-2.5 flex-1 pr-2">
            <Ionicons name="sparkles" size={17} color="#111827" />
            <ThemedText
              variant="body"
              className="font-semibold text-[13.5px] text-text-primary"
              numberOfLines={1}
            >
              quiet pet friendly cabin with hot tub
            </ThemedText>
          </View>

          <View className="w-9 h-9 rounded-full bg-white items-center justify-center shadow-sm">
            <Feather name="arrow-up-right" size={18} color="#111827" />
          </View>
        </PressableScale>

        {/* Category Filters: Row 1 & Row 2 */}
        <View className="gap-2.5 pt-1">
          <View className="flex-row items-center gap-2.5">
            {ROW_1_CATEGORIES.map(renderCategoryChip)}
          </View>
          <View className="flex-row items-center gap-2.5">
            {ROW_2_CATEGORIES.map(renderCategoryChip)}
          </View>
        </View>

        {/* Stay Listings Cards List */}
        <View className="gap-6 pt-2">
          {filteredStays.map((stay) => (
            <PressableScale
              key={stay.id}
              scaleTo={0.98}
              haptic="light"
              className="w-full h-[370px] rounded-[32px] overflow-hidden bg-surface-gray shadow-md relative"
            >
              {/* Card Photo */}
              <Image
                source={{ uri: stay.imageUri }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
                transition={300}
              />

              {/* Top-Right Star Rating Badge */}
              <View className="absolute top-4 right-4 bg-white/95 rounded-full px-3.5 py-1.5 flex-row items-center gap-1.5 shadow-md">
                <Ionicons name="star" size={14} color="#111827" />
                <ThemedText variant="caption" className="font-bold text-sm text-text-primary">
                  {stay.rating.toFixed(1)}
                </ThemedText>
              </View>

              {/* Bottom Gradient Overlay for text readability */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.88)']}
                locations={[0, 0.4, 1]}
                className="absolute inset-x-0 bottom-0 min-h-[165px] px-5 pb-5 justify-end"
              >
                {/* Location with Pin */}
                <View className="flex-row items-center gap-1.5 mb-1.5">
                  <Ionicons name="location-sharp" size={14} color="#FFFFFF" />
                  <ThemedText
                    variant="caption"
                    className="text-white/90 text-sm font-medium"
                  >
                    {stay.location}
                  </ThemedText>
                </View>

                {/* Stay Title */}
                <View className="flex-row items-end justify-between gap-3">
                  <View className="flex-1">
                    <ThemedText
                      variant="display"
                      className="text-white text-[22px] leading-[28px] font-black tracking-tight"
                      numberOfLines={2}
                    >
                      {stay.title.replace('\n', ' ')}
                    </ThemedText>
                  </View>

                  {/* Circular Chevron Action Button */}
                  <View className="w-11 h-11 rounded-full bg-white items-center justify-center shadow-lg shrink-0 mb-0.5">
                    <Ionicons name="chevron-forward" size={20} color="#111827" />
                  </View>
                </View>
              </LinearGradient>
            </PressableScale>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
