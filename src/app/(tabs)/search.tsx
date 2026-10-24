import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, Redirect } from 'expo-router';
import { colors } from '../../theme';
import { ThemedText, PressableScale, Badge } from '../../components';
import { useAuth } from '../../context/auth-context';
import { STAYS_DATA, StayCategory } from '../../data/stays';

interface CategoryOption {
  key: StayCategory;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const CATEGORIES: CategoryOption[] = [
  { key: 'all', label: 'All Stays', iconName: 'home' },
  { key: 'cabins', label: 'Cabins', iconName: 'triangle' },
  { key: 'beach', label: 'Beach', iconName: 'water' },
  { key: 'city', label: 'City', iconName: 'business' },
  { key: 'villas', label: 'Villas', iconName: 'leaf' },
];

const NLP_SUGGESTIONS = [
  'quiet pet friendly cabin with hot tub',
  'secluded beach house',
  'cozy cabin under $300',
  'desert stargazer villa',
  'luxury vineyard villa',
];

export default function SearchScreen() {
  const { isSignedIn, isLoaded } = useAuth();
  const params = useLocalSearchParams<{ q?: string }>();
  const [inputText, setInputText] = useState(params.q || '');
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<StayCategory>('all');

  const activeQuery = submittedQuery !== null ? submittedQuery : (params.q || '');

  const handleSubmitSearch = () => {
    Keyboard.dismiss();
    setSubmittedQuery(inputText.trim());
  };

  const handleClearSearch = () => {
    setInputText('');
    setSubmittedQuery('');
  };

  const handleSelectNlpSuggestion = (suggestion: string) => {
    Keyboard.dismiss();
    setInputText(suggestion);
    setSubmittedQuery(suggestion);
  };

  const handleResetAll = () => {
    setInputText('');
    setSubmittedQuery('');
    setSelectedCategory('all');
  };

  // Filter stays based on activeQuery and selectedCategory
  const filteredStays = useMemo(() => {
    return STAYS_DATA.filter((stay) => {
      // Category filter
      if (selectedCategory !== 'all' && stay.category !== selectedCategory) {
        return false;
      }

      // Query filter (if query exists)
      if (activeQuery) {
        const queryLower = activeQuery.toLowerCase().trim();

        // Check for price constraint (e.g. "under $300" or "under 300")
        const priceMatch = queryLower.match(/under\s*\$?(\d+)/i);
        if (priceMatch) {
          const maxPrice = parseInt(priceMatch[1], 10);
          if (stay.pricePerNight > maxPrice) {
            return false;
          }
        }

        // Check for specific boolean features
        if (queryLower.includes('pet friendly') || queryLower.includes('pet')) {
          if (!stay.features.isPetFriendly) return false;
        }
        if (queryLower.includes('hot tub')) {
          if (!stay.features.hasHotTub) return false;
        }

        // Search tokens across title, location, description, and tags
        const tokens = queryLower
          .replace(/under\s*\$?\d+/gi, '')
          .replace(/[^\w\s]/gi, '')
          .split(/\s+/)
          .filter((t) => t.length > 2 && !['with', 'the', 'and', 'for', 'stay'].includes(t));

        if (tokens.length > 0) {
          const haystack = `${stay.title} ${stay.location} ${stay.description} ${stay.tags.join(' ')}`.toLowerCase();
          const matchesAny = tokens.some((token) => haystack.includes(token));
          if (!matchesAny) {
            return false;
          }
        }
      }

      return true;
    });
  }, [activeQuery, selectedCategory]);

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
      {/* Search Header Bar */}
      <View className="px-5 pt-3 pb-3 border-b border-border-gray/40 gap-3">
        <View className="flex-row items-center justify-between">
          <ThemedText variant="display" className="text-2xl font-black text-text-primary tracking-tight">
            Search
          </ThemedText>
          {activeQuery ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Reset search query"
              onPress={handleResetAll}
              className="py-1 px-3 bg-surface-gray rounded-full active:opacity-75"
            >
              <ThemedText variant="caption" className="text-xs font-semibold text-text-secondary">
                Reset all
              </ThemedText>
            </Pressable>
          ) : null}
        </View>

        {/* Input Field with Search & Clear Buttons */}
        <View className="flex-row items-center bg-surface-gray rounded-2xl px-3.5 py-2.5 border border-border-gray/50">
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSubmitSearch}
            placeholder="Search destination, style, or query..."
            placeholderTextColor={colors.textSecondary}
            returnKeyType="search"
            autoCapitalize="none"
            className="flex-1 ml-2.5 text-base font-medium text-text-primary p-0"
          />
          {inputText.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear input"
              onPress={handleClearSearch}
              className="p-1 active:opacity-60"
            >
              <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
            </Pressable>
          ) : null}
          <PressableScale
            scaleTo={0.92}
            haptic="light"
            onPress={handleSubmitSearch}
            accessibilityRole="button"
            accessibilityLabel="Submit search"
            className="ml-2 bg-text-primary px-3 py-1.5 rounded-xl active:opacity-80"
          >
            <ThemedText variant="caption" className="text-white font-bold text-xs">
              Search
            </ThemedText>
          </PressableScale>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="px-5 pt-4 pb-28 gap-5"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* NLP Quick Suggestions Carousel */}
        <View className="gap-2">
          <ThemedText variant="caption" color={colors.textSecondary} className="text-xs font-bold tracking-wider uppercase">
            Try a natural language stay
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 pr-4"
          >
            {NLP_SUGGESTIONS.map((suggestion, index) => {
              const isActive = activeQuery.toLowerCase() === suggestion.toLowerCase();
              return (
                <PressableScale
                  key={index}
                  scaleTo={0.95}
                  haptic="selection"
                  onPress={() => handleSelectNlpSuggestion(suggestion)}
                  accessibilityRole="button"
                  accessibilityLabel={`Search prompt: ${suggestion}`}
                  className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${
                    isActive
                      ? 'bg-[#D8B4FE] border-[#C084FC]'
                      : 'bg-surface-white border-border-gray shadow-sm'
                  }`}
                >
                  <Ionicons
                    name="sparkles"
                    size={13}
                    color={isActive ? '#111827' : colors.textSecondary}
                  />
                  <ThemedText
                    variant="caption"
                    className={`text-xs ${
                      isActive ? 'font-bold text-text-primary' : 'font-medium text-text-primary'
                    }`}
                  >
                    &ldquo;{suggestion}&rdquo;
                  </ThemedText>
                </PressableScale>
              );
            })}
          </ScrollView>
        </View>

        {/* Category Filter Chips */}
        <View className="gap-2">
          <ThemedText variant="caption" color={colors.textSecondary} className="text-xs font-bold tracking-wider uppercase">
            Categories
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 pr-4"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <PressableScale
                  key={cat.key}
                  scaleTo={0.95}
                  haptic="selection"
                  onPress={() => setSelectedCategory(cat.key)}
                  accessibilityRole="button"
                  accessibilityLabel={`Filter ${cat.label}`}
                  className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full ${
                    isSelected
                      ? 'bg-primary-yellow shadow-sm'
                      : 'bg-surface-gray border border-border-gray/30'
                  }`}
                >
                  <Ionicons
                    name={cat.iconName}
                    size={14}
                    color={isSelected ? '#111827' : colors.textPrimary}
                  />
                  <ThemedText
                    variant="caption"
                    className={`text-xs ${
                      isSelected ? 'font-bold text-text-primary' : 'font-semibold text-text-primary'
                    }`}
                  >
                    {cat.label}
                  </ThemedText>
                </PressableScale>
              );
            })}
          </ScrollView>
        </View>

        {/* Results Count & Status */}
        <View className="flex-row items-center justify-between pt-1">
          <ThemedText variant="title" className="font-bold text-lg text-text-primary">
            {activeQuery ? `Results for "${activeQuery}"` : 'All Available Stays'}
          </ThemedText>
          <ThemedText variant="caption" color={colors.textSecondary} className="text-xs font-medium">
            {filteredStays.length} {filteredStays.length === 1 ? 'stay' : 'stays'}
          </ThemedText>
        </View>

        {/* Stays List or Empty State */}
        {filteredStays.length === 0 ? (
          <View className="py-14 items-center justify-center gap-3 bg-surface-gray/60 rounded-3xl p-6 border border-border-gray/50">
            <View className="w-16 h-16 rounded-full bg-surface-white items-center justify-center shadow-sm">
              <Ionicons name="compass-outline" size={32} color={colors.textSecondary} />
            </View>
            <ThemedText variant="title" className="font-bold text-lg text-text-primary text-center">
              No stays match your search
            </ThemedText>
            <ThemedText variant="caption" color={colors.textSecondary} className="text-center text-sm px-4">
              We couldn&apos;t find any stays matching your filters. Try different keywords or reset to see all stays.
            </ThemedText>
            <PressableScale
              scaleTo={0.95}
              haptic="light"
              onPress={handleResetAll}
              className="mt-2 bg-text-primary px-5 py-2.5 rounded-full shadow-sm"
            >
              <ThemedText variant="caption" className="text-white font-bold text-sm">
                Reset all filters
              </ThemedText>
            </PressableScale>
          </View>
        ) : (
          <View className="gap-5">
            {filteredStays.map((stay) => (
              <PressableScale
                key={stay.id}
                scaleTo={0.98}
                haptic="light"
                accessibilityRole="button"
                accessibilityLabel={`${stay.title}, ${stay.location}, $${stay.pricePerNight} per night`}
                className="bg-surface-white rounded-3xl border border-border-gray overflow-hidden shadow-sm"
              >
                {/* Stay Photo with Floating Rating */}
                <View className="relative w-full h-[210px] bg-surface-gray">
                  <Image
                    source={{ uri: stay.imageUri }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                    transition={250}
                  />

                  {/* Rating Badge */}
                  <View className="absolute top-3.5 right-3.5 bg-surface-white/95 rounded-full px-3 py-1 flex-row items-center gap-1 shadow-md">
                    <Ionicons name="star" size={13} color="#111827" />
                    <ThemedText variant="caption" className="font-bold text-xs text-text-primary">
                      {stay.rating.toFixed(1)}
                    </ThemedText>
                    <ThemedText variant="caption" color={colors.textSecondary} className="text-[11px]">
                      ({stay.reviewsCount})
                    </ThemedText>
                  </View>

                  {/* Category Pill on Image */}
                  <View className="absolute bottom-3.5 left-3.5 bg-black/60 rounded-full px-3 py-1">
                    <ThemedText variant="caption" className="text-white font-semibold text-xs capitalize">
                      {stay.category}
                    </ThemedText>
                  </View>
                </View>

                {/* Card Content Details */}
                <View className="p-4 gap-2">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                    <ThemedText variant="caption" color={colors.textSecondary} className="text-xs font-medium">
                      {stay.location}
                    </ThemedText>
                  </View>

                  <ThemedText variant="title" className="font-bold text-lg text-text-primary" numberOfLines={1}>
                    {stay.title.replace('\n', ' ')}
                  </ThemedText>

                  <ThemedText variant="caption" color={colors.textSecondary} className="text-xs line-clamp-2" numberOfLines={2}>
                    {stay.description}
                  </ThemedText>

                  {/* Feature Tags */}
                  <View className="flex-row flex-wrap gap-1.5 mt-1">
                    {stay.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} label={tag} variant="neutral" />
                    ))}
                  </View>

                  <View className="h-[1px] bg-border-gray/60 my-1" />

                  {/* Price Row */}
                  <View className="flex-row items-baseline justify-between">
                    <View className="flex-row items-baseline">
                      <ThemedText variant="title" className="font-bold text-xl text-text-primary">
                        ${stay.pricePerNight}
                      </ThemedText>
                      <ThemedText variant="caption" color={colors.textSecondary} className="text-xs font-medium ml-1">
                        / night
                      </ThemedText>
                    </View>

                    <ThemedText variant="caption" color={colors.textSecondary} className="text-xs">
                      {stay.features.guests} guests · {stay.features.bedrooms} bed
                    </ThemedText>
                  </View>
                </View>
              </PressableScale>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
