import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import {
  ThemedText,
  Button,
  IconButton,
  Input,
  SearchInput,
  FilterChip,
  CategoryChip,
  Badge,
  AlertBanner,
  SegmentedControl,
  Toggle,
  Stepper,
  ListingCard,
  PolicyCard,
  ProfileGroup,
  LiquidGlassTabBar,
  TabKey,
} from '../components';

export default function DesignSystemScreen() {
  const [activeFilter, setActiveFilter] = useState('Cabins');
  const [activeCategory, setActiveCategory] = useState('All Stays');
  const [toggleValue, setToggleValue] = useState(true);
  const [stepperValue, setStepperValue] = useState(1);
  const [activeSegment, setActiveSegment] = useState<'list' | 'map'>('list');
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [focusedInputText, setFocusedInputText] = useState('Joanna Smith');

  return (
    <SafeAreaView className="flex-1 bg-surface-gray">
      <ScrollView
        contentContainerClassName="p-4 gap-4 pb-24"
        showsVerticalScrollIndicator={false}
      >
        {/* 01. BRAND */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-2">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider mb-1">
            01. Brand
          </ThemedText>
          <ThemedText variant="display" className="text-[52px] leading-[54px] font-black tracking-tighter">
            roam
          </ThemedText>
          <ThemedText variant="title" color={colors.textSecondary} className="text-lg font-medium leading-6">
            Find unforgettable stays{'\n'}for every kind of trip.
          </ThemedText>
        </View>

        {/* 02. COLOR PALETTE */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            02. Color palette
          </ThemedText>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            <PaletteSwatch
              name="Primary Yellow"
              hex="#FFC629"
              desc="Primary actions, active states"
              color={colors.primaryYellow}
            />
            <PaletteSwatch
              name="Lavender"
              hex="#C9B4FF"
              desc="Secondary actions, highlights"
              color={colors.lavender}
            />
            <PaletteSwatch
              name="Text Primary"
              hex="#0B0B1A"
              desc="Headings, primary text"
              color={colors.textPrimary}
            />
            <PaletteSwatch
              name="Text Secondary"
              hex="#6B7280"
              desc="Body text, secondary text"
              color={colors.textSecondary}
            />
            <PaletteSwatch
              name="Surface White"
              hex="#FFFFFF"
              desc="Cards, sheets, modals"
              color={colors.surfaceWhite}
              border
            />
            <PaletteSwatch
              name="Surface Gray"
              hex="#F4F5F7"
              desc="App background, input fields"
              color={colors.surfaceGray}
              border
            />
            <PaletteSwatch
              name="Border Gray"
              hex="#E5E7EB"
              desc="Dividers, borders"
              color={colors.borderGray}
              border
            />
            <PaletteSwatch
              name="Glass Blur"
              hex="rgba(255,255,255,0.7)"
              desc="Tab bar, glass surfaces"
              color={colors.glassBlur}
              border
            />
          </View>
        </View>

        {/* 03. TYPOGRAPHY */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-4">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            03. Typography
          </ThemedText>
          
          <View className="flex-row gap-4 items-start">
            <ThemedText variant="caption" color={colors.textSecondary} className="w-16 font-semibold">
              Display
            </ThemedText>
            <View className="flex-1 gap-1">
              <ThemedText variant="heading" className="text-3xl leading-8">
                Find your{'\n'}next stay
              </ThemedText>
              <ThemedText variant="caption" color={colors.textSecondary} className="text-xs">
                Font: Geometric Sans (Bold) · Size: 56–64 · Line height: 1.0
              </ThemedText>
            </View>
          </View>

          <View className="h-[1px] bg-border-gray" />

          <View className="flex-row gap-4 items-start">
            <ThemedText variant="caption" color={colors.textSecondary} className="w-16 font-semibold">
              Heading
            </ThemedText>
            <View className="flex-1 gap-1">
              <ThemedText variant="heading" className="text-2xl leading-7">
                Modern Cabin{'\n'}with Hot Tub
              </ThemedText>
              <ThemedText variant="caption" color={colors.textSecondary} className="text-xs">
                Font: Geometric Sans (Bold) · Size: 28–32 · Line height: 1.2
              </ThemedText>
            </View>
          </View>

          <View className="h-[1px] bg-border-gray" />

          <View className="flex-row gap-4 items-start">
            <ThemedText variant="caption" color={colors.textSecondary} className="w-16 font-semibold">
              Body
            </ThemedText>
            <View className="flex-1 gap-1">
              <ThemedText variant="body" className="text-sm leading-5">
                From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip.
              </ThemedText>
              <ThemedText variant="caption" color={colors.textSecondary} className="text-xs">
                Font: Geometric Sans (Regular) · Size: 16 · Line height: 1.5
              </ThemedText>
            </View>
          </View>

          <View className="h-[1px] bg-border-gray" />

          <View className="flex-row gap-4 items-start">
            <ThemedText variant="caption" color={colors.textSecondary} className="w-16 font-semibold">
              Caption
            </ThemedText>
            <View className="flex-1 gap-1">
              <ThemedText variant="caption" color={colors.textPrimary} className="font-semibold">
                Lake Arrowhead, CA
              </ThemedText>
              <ThemedText variant="caption" color={colors.textSecondary} className="text-xs">
                Font: Geometric Sans (Medium) · Size: 14
              </ThemedText>
            </View>
          </View>

          <View className="h-[1px] bg-border-gray" />

          <View className="flex-row gap-4 items-center">
            <ThemedText variant="caption" color={colors.textSecondary} className="w-16 font-semibold">
              Button
            </ThemedText>
            <View className="flex-1 gap-1 items-start">
              <Button title="Book this stay" size="sm" />
              <ThemedText variant="caption" color={colors.textSecondary} className="text-xs">
                Font: Geometric Sans (Medium/SemiBold) · Size: 17–18
              </ThemedText>
            </View>
          </View>
        </View>

        {/* 04. BUTTONS */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            04. Buttons
          </ThemedText>
          <Button
            variant="primary"
            title="Book this stay"
            trailingIcon={<Feather name="arrow-right" size={18} color={colors.textPrimary} />}
          />
          <Button
            variant="secondary"
            title="Continue with Google"
            leadingIcon={<Ionicons name="logo-google" size={18} color="#EA4335" />}
          />
          <View className="flex-row gap-3 pt-1">
            <IconButton
              icon={<Ionicons name="heart-outline" size={20} color={colors.textPrimary} />}
              accessibilityLabel="Favorite"
            />
            <IconButton
              icon={<Feather name="share" size={19} color={colors.textPrimary} />}
              accessibilityLabel="Share"
            />
            <IconButton
              icon={<Feather name="search" size={19} color={colors.textPrimary} />}
              accessibilityLabel="Search"
            />
            <IconButton
              icon={<Feather name="bookmark" size={19} color={colors.textPrimary} />}
              accessibilityLabel="Bookmark"
            />
          </View>
        </View>

        {/* 05. INPUT FIELDS */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            05. Input Fields
          </ThemedText>
          <SearchInput placeholder="Cabins in California" />
          <Input
            placeholder="Enter your name"
            leadingIcon={<Ionicons name="person-outline" size={20} color={colors.textSecondary} />}
          />
          <Input
            value={focusedInputText}
            onChangeText={setFocusedInputText}
            leadingIcon={<Ionicons name="person-outline" size={20} color={colors.textPrimary} />}
          />
          <Input
            isPassword
            defaultValue="password123"
            leadingIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />}
          />
        </View>

        {/* 06. FILTER CHIPS */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            06. Filter chips
          </ThemedText>
          <View className="flex-row flex-wrap gap-2">
            {['Cabins', 'Under $300', 'Pet Friendly', 'Quiet'].map((chip) => (
              <FilterChip
                key={chip}
                label={chip}
                selected={activeFilter === chip}
                onPress={() => setActiveFilter(chip)}
              />
            ))}
          </View>
          <View className="flex-row flex-wrap gap-2 pt-1">
            <CategoryChip
              label="All Stays"
              selected={activeCategory === 'All Stays'}
              icon={<Ionicons name="home" size={16} color={colors.textPrimary} />}
              onPress={() => setActiveCategory('All Stays')}
            />
            <CategoryChip
              label="Cabins"
              selected={activeCategory === 'Cabins'}
              icon={<Ionicons name="bonfire-outline" size={16} color={colors.textPrimary} />}
              onPress={() => setActiveCategory('Cabins')}
            />
            <CategoryChip
              label="Beach"
              selected={activeCategory === 'Beach'}
              icon={<Ionicons name="water-outline" size={16} color={colors.textPrimary} />}
              onPress={() => setActiveCategory('Beach')}
            />
            <CategoryChip
              label="City"
              selected={activeCategory === 'City'}
              icon={<Ionicons name="business-outline" size={16} color={colors.textPrimary} />}
              onPress={() => setActiveCategory('City')}
            />
            <CategoryChip
              label="Villas"
              selected={activeCategory === 'Villas'}
              icon={<Ionicons name="leaf-outline" size={16} color={colors.textPrimary} />}
              onPress={() => setActiveCategory('Villas')}
            />
          </View>
        </View>

        {/* 07. LISTING CARD */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            07. Listing card
          </ThemedText>
          <ListingCard
            imageUri="https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=800&auto=format&fit=crop"
            title="Modern Cabin with Hot Tub"
            location="Lake Arrowhead, CA"
            rating={4.9}
            reviewCount={342}
            pricePerNight={280}
            amenities={[
              { label: 'Hot Tub', iconName: 'water-outline' },
              { label: 'Pet Friendly', iconName: 'paw-outline' },
            ]}
          />
        </View>

        {/* 08. POLICY CARD */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            08. Policy card
          </ThemedText>
          <PolicyCard
            icon={<Ionicons name="chatbubble-ellipses-outline" size={22} color="#7C3AED" />}
            title="Ask about policies"
            description="Cancellation, house rules, pets, check-in and more."
          />
          <PolicyCard
            icon={<Ionicons name="document-text-outline" size={22} color="#7C3AED" />}
            title="Free cancellation"
            description="Full refund up to 7 days before check-in."
          />
        </View>

        {/* 09. PROFILE ROW */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            09. Profile row
          </ThemedText>
          <ProfileGroup
            items={[
              {
                id: '1',
                label: 'Personal info',
                icon: <Ionicons name="person-outline" size={20} color={colors.textPrimary} />,
              },
              {
                id: '2',
                label: 'Payment methods',
                icon: <Ionicons name="card-outline" size={20} color={colors.textPrimary} />,
              },
              {
                id: '3',
                label: 'Trips',
                icon: <Ionicons name="briefcase-outline" size={20} color={colors.textPrimary} />,
              },
            ]}
          />
        </View>

        {/* 10. BOTTOM NAVIGATION */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            10. Bottom navigation (Liquid glass tab bar)
          </ThemedText>
          <View className="py-4 items-center bg-surface-gray rounded-2xl">
            <LiquidGlassTabBar
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
            />
          </View>
        </View>

        {/* 11. ICONOGRAPHY */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            11. Iconography
          </ThemedText>
          <View className="flex-row justify-between py-2 px-1">
            <Ionicons name="home-outline" size={24} color={colors.textPrimary} />
            <Ionicons name="search-outline" size={24} color={colors.textPrimary} />
            <Ionicons name="heart-outline" size={24} color={colors.textPrimary} />
            <Ionicons name="calendar-outline" size={24} color={colors.textPrimary} />
            <Ionicons name="person-outline" size={24} color={colors.textPrimary} />
            <Ionicons name="settings-outline" size={24} color={colors.textPrimary} />
            <Ionicons name="location-outline" size={24} color={colors.textPrimary} />
            <Ionicons name="options-outline" size={24} color={colors.textPrimary} />
          </View>
        </View>

        {/* 12. SEGMENTED CONTROL & 13. TOGGLES / STEPPERS */}
        <View className="flex-row gap-4">
          <View className="flex-1 bg-surface-white rounded-3xl p-4 border border-border-gray shadow-sm gap-3">
            <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
              12. Segmented control
            </ThemedText>
            <SegmentedControl
              value={activeSegment}
              onChange={setActiveSegment}
              options={[
                {
                  value: 'list',
                  label: 'List',
                  icon: <Ionicons name="list" size={16} color={activeSegment === 'list' ? colors.surfaceWhite : colors.textPrimary} />,
                },
                {
                  value: 'map',
                  label: 'Map',
                  icon: <Ionicons name="map-outline" size={16} color={activeSegment === 'map' ? colors.surfaceWhite : colors.textPrimary} />,
                },
              ]}
            />
          </View>

          <View className="flex-1 bg-surface-white rounded-3xl p-4 border border-border-gray shadow-sm gap-3">
            <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
              13. Toggles / Steppers
            </ThemedText>
            <View className="flex-row items-center gap-3">
              <Toggle value={toggleValue} onValueChange={setToggleValue} />
              <Stepper value={stepperValue} onChange={setStepperValue} />
            </View>
          </View>
        </View>

        {/* 14. STATUS / ALERTS */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            14. Status / Alerts
          </ThemedText>
          <AlertBanner
            type="success"
            message="Account created successfully"
          />
          <AlertBanner
            type="error"
            message="Something went wrong. Please try again."
          />
        </View>

        {/* 15. TAGS / BADGES */}
        <View className="bg-surface-white rounded-3xl p-5 border border-border-gray shadow-sm gap-3">
          <ThemedText variant="caption" color={colors.textSecondary} className="font-bold text-xs uppercase tracking-wider">
            15. Tags / Badges
          </ThemedText>
          <View className="flex-row flex-wrap gap-2">
            <Badge
              label="Guest favorite"
              variant="favorite"
              icon={<Ionicons name="star" size={13} color={colors.badgeFavorite} />}
            />
            <Badge label="New" variant="new" />
            <Badge label="20% off" variant="discount" />
            <Badge label="Superhost" variant="superhost" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PaletteSwatch({
  name,
  hex,
  desc,
  color,
  border = false,
}: {
  name: string;
  hex: string;
  desc: string;
  color: string;
  border?: boolean;
}) {
  return (
    <View className="w-[47%] gap-1.5">
      <View
        className={`h-12 w-full rounded-xl ${border ? 'border border-border-gray' : ''}`}
        style={{ backgroundColor: color }}
      />
      <View className="gap-0.5">
        <ThemedText variant="caption" color={colors.textPrimary} className="font-bold text-xs">
          {name}
        </ThemedText>
        <ThemedText
          variant="caption"
          color={colors.textSecondary}
          className="text-[11px]"
          style={{ fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }) }}
        >
          {hex}
        </ThemedText>
        <ThemedText variant="caption" color={colors.textSecondary} className="text-[11px] leading-3.5">
          {desc}
        </ThemedText>
      </View>
    </View>
  );
}
