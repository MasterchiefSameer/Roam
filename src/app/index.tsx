import React, { useState, useRef } from 'react';
import {
  View,
  Pressable,
  FlatList,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../theme';
import { ThemedText } from '../components';

interface SlideData {
  id: string;
  imageUri: string;
  location: string;
  title: string;
  copy: string;
}

const SLIDES: SlideData[] = [
  {
    id: '1',
    imageUri: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1200&auto=format&fit=crop',
    location: 'Whistler, BC',
    title: 'Find a stay that\nfits your story',
    copy: 'From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip.',
  },
  {
    id: '2',
    imageUri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    location: 'Big Sur, CA',
    title: 'Breathtaking views,\ncrafted for you',
    copy: 'Discover secluded coastal escapes and architectural gems curated to inspire your next adventure.',
  },
  {
    id: '3',
    imageUri: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1200&auto=format&fit=crop',
    location: 'Aspen, CO',
    title: 'Travel effortlessly,\nstay memorably',
    copy: 'Simple bookings, transparent policies, and unforgettable memories waiting behind every door.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const heroHeight = Math.round(windowHeight * 0.58);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / windowWidth);
    if (index >= 0 && index < SLIDES.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleGetStarted = () => {
    router.push('/(auth)/sign-up');
  };

  const handleSkip = () => {
    router.push('/(auth)/sign-in');
  };

  const activeSlide = SLIDES[activeIndex];

  return (
    <View className="flex-1 bg-surface-white">
      {/* Top Header Bar (Absolute overlay across the top) */}
      <View
        className="absolute top-0 left-0 right-0 z-20 flex-row items-center justify-between px-6"
        style={{ paddingTop: Math.max(insets.top, 16) }}
      >
        <ThemedText variant="display" className="text-3xl font-black text-text-primary tracking-tight">
          roam
        </ThemedText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
          onPress={handleSkip}
          className="bg-surface-white/85 rounded-full py-1.5 px-4 border border-white/70 shadow-sm active:opacity-70"
        >
          <ThemedText variant="caption" color={colors.textPrimary} className="font-semibold text-sm">
            Skip
          </ThemedText>
        </Pressable>
      </View>

      {/* Swipeable Hero Carousel */}
      <View style={{ height: heroHeight }}>
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={{ width: windowWidth, height: heroHeight }} className="relative bg-surface-gray">
              <Image
                source={{ uri: item.imageUri }}
                style={{ width: '100%', height: '100%' }}
                className="w-full h-full"
                contentFit="cover"
                transition={300}
              />
              {/* Location Badge (Floating over bottom-left of photo) */}
              <View className="absolute bottom-6 left-6 z-10 flex-row items-center bg-black/50 border border-white/20 py-1.5 px-3.5 rounded-full shadow-md">
                <Ionicons name="location-sharp" size={14} color="#FFFFFF" className="mr-1.5" />
                <ThemedText variant="caption" color="#FFFFFF" className="font-semibold text-xs ml-1">
                  {item.location}
                </ThemedText>
              </View>
            </View>
          )}
        />
      </View>

      {/* Bottom Sheet Card (Overlapping card with rounded top) */}
      <View className="flex-1 -mt-7 bg-surface-white rounded-t-[36px] px-6 pt-5 pb-8 justify-between shadow-2xl z-10">
        <View>
          {/* 3-Segment Progress Indicator */}
          <View className="flex-row items-center gap-1.5 mb-4">
            {SLIDES.map((_, idx) => (
              <View
                key={idx}
                className={
                  idx === activeIndex
                    ? 'w-10 h-1.5 bg-lavender rounded-full'
                    : 'w-2.5 h-1.5 bg-border-gray rounded-full'
                }
              />
            ))}
          </View>

          {/* Heading */}
          <ThemedText
            variant="heading"
            className="text-[32px] leading-[36px] font-black text-text-primary tracking-tight mb-2.5"
          >
            {activeSlide.title}
          </ThemedText>

          {/* Copy Description */}
          <ThemedText
            variant="body"
            color={colors.textSecondary}
            className="text-[15px] leading-[22px] font-normal"
          >
            {activeSlide.copy}
          </ThemedText>
        </View>

        {/* Fixed Action Buttons */}
        <View className="gap-3 pt-4">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get started"
            onPress={handleGetStarted}
            className="bg-primary-yellow rounded-full py-4 px-6 items-center justify-center flex-row active:opacity-85 active:scale-[0.985] shadow-sm"
          >
            <ThemedText variant="button" className="font-bold text-base text-text-primary mr-2">
              Get started
            </ThemedText>
            <Feather name="arrow-right" size={18} color={colors.textPrimary} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue with Google"
            onPress={handleGetStarted}
            className="bg-surface-white rounded-full py-3.5 px-6 border border-border-gray flex-row items-center justify-center gap-2.5 active:opacity-80 active:scale-[0.985] shadow-sm"
          >
            <Ionicons name="logo-google" size={18} color="#EA4335" />
            <ThemedText variant="button" className="font-semibold text-[15px] text-text-primary">
              Continue with Google
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
