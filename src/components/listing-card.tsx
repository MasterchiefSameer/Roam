import React, { useState } from 'react';
import {
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { ThemedText } from './themed-text';
import { Badge } from './badge';

export interface Amenity {
  label: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export interface ListingCardProps {
  imageUri: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities?: Amenity[];
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function ListingCard({
  imageUri,
  title,
  location,
  rating,
  reviewCount,
  pricePerNight,
  amenities = [
    { label: 'Hot Tub', iconName: 'water-outline' },
    { label: 'Pet Friendly', iconName: 'paw-outline' },
  ],
  isFavorite = false,
  onFavoriteToggle,
  onPress,
  style,
  className = '',
}: ListingCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoritePress = (e: any) => {
    e.stopPropagation?.();
    setFavorite((prev) => !prev);
    onFavoriteToggle?.();
  };

  const CardContainer = (onPress ? Pressable : View) as React.ComponentType<any>;

  return (
    <CardContainer
      {...(onPress ? { onPress, accessibilityLabel: title } : {})}
      className={`bg-surface-white rounded-3xl border border-border-gray overflow-hidden ${onPress ? 'active:opacity-95' : ''} ${className}`}
      style={style}
    >
      <View className="relative w-full h-[200px] bg-surface-gray">
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: '100%' }}
          className="w-full h-full"
          contentFit="cover"
          transition={300}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}
          onPress={handleFavoritePress}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-surface-white items-center justify-center shadow-md active:scale-90"
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={18}
            color={favorite ? colors.error : colors.textPrimary}
          />
        </Pressable>
      </View>

      <View className="p-4 gap-2">
        <ThemedText variant="title" className="font-bold text-lg" numberOfLines={1}>
          {title}
        </ThemedText>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={15} color={colors.textSecondary} />
            <ThemedText variant="caption" color={colors.textSecondary}>
              {location}
            </ThemedText>
          </View>

          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={14} color={colors.primaryYellow} />
            <ThemedText variant="caption" color={colors.textPrimary} className="font-bold">
              {rating}
            </ThemedText>
            <ThemedText variant="caption" color={colors.textSecondary}>
              ({reviewCount})
            </ThemedText>
          </View>
        </View>

        {amenities.length > 0 ? (
          <View className="flex-row flex-wrap gap-2 mt-1">
            {amenities.map((item, index) => (
              <Badge
                key={index}
                label={item.label}
                variant="neutral"
                icon={
                  item.iconName ? (
                    <Ionicons name={item.iconName} size={14} color={colors.textPrimary} />
                  ) : undefined
                }
              />
            ))}
          </View>
        ) : null}

        <View className="flex-row items-baseline mt-1">
          <ThemedText variant="title" className="font-bold text-xl">
            ${pricePerNight}
          </ThemedText>
          <ThemedText variant="caption" color={colors.textSecondary}>
            {' '}/ night
          </ThemedText>
        </View>
      </View>
    </CardContainer>
  );
}
