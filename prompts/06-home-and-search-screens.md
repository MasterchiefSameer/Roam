# 06 · Home Screen from Design & Search Screen with Local Data

Status: done

## Goal
Build the pixel-accurate Home screen matching `assets/home.png` with rich local stay data, natural language prompt interaction, interactive category filtering, system NativeTabs with Ink tint, and a dedicated Search screen with on-submit query filtering, adhering to `expo-animation` and `expo-design-system`.

## Decisions
1. **Navigation & Tab Bar (`expo-router/native-tabs`)**:
   - Use platform-native tabs via `NativeTabs` from `expo-router/native-tabs` (iOS liquid glass appearance and Android native navigation).
   - Tab tint: Ink tint (`#111827` / `colors.textPrimary`).
   - 4 Tabs in `src/app/(tabs)/_layout.tsx`:
     - `home`: `sf="house.fill"`, `md="home"`, Label: "Home"
     - `search`: `sf="magnifyingglass"`, `md="search"`, Label: "Search", `role="search"`
     - `trips`: `sf="calendar"`, `md="calendar_today"`, Label: "Trips"
     - `profile`: `sf="person.fill"`, `md="person"`, Label: "Profile"
   - Routes:
     - `src/app/(tabs)/home.tsx` maps to `/home` (preserving existing auth redirects).
     - `src/app/(tabs)/search.tsx` maps to `/search`.
     - `src/app/(tabs)/trips.tsx` maps to `/trips`.
     - `src/app/(tabs)/profile.tsx` maps to `/profile`.
2. **Design Reproduction (`assets/home.png`)**:
   - **Header**: Lowercase bold `roam` logo on top-left; user avatar with warm amber circle ring (`#FCD34D`) on top-right (pulling user picture/name from Clerk with fallback).
   - **Greeting & Title**: "Hey, {firstName || 'Joanna'} 👋" followed by bold display headline "Find your\nnext stay" and a squircle search action button that routes to `/search`.
   - **Natural Language Search Banner**: Lavender pill banner (`#D8B4FE` / `#C7D2FE`) featuring sparkles icon, `"quiet pet friendly cabin with hot tub"`, and diagonal arrow button (`↗`). Tapping opens `/search` prefilled with this exact query.
   - **Category Filters**: Two-row pill grid ("All Stays" active in golden amber `#F59E0B`, "Cabins", "Beach", "City", "Villas"). Interactive filtering with instant list updates and haptic feedback.
   - **Featured Stay Cards**: Full-bleed photo cards with `rounded-[32px]`, top-right `★ 4.9` pill badge, bottom dark gradient overlay, location tag `📍 Lake Arrowhead, CA`, bold title, and circular chevron action button (`>`). Second card peeking from bottom.
3. **Card Tap Interaction**:
   - As requested, cards show press feedback only (`scale: 0.98`, subtle haptic). The tap gets wired when the property details screen is built from its design.
4. **Search Screen & Result Updates (`src/app/(tabs)/search.tsx`)**:
   - Search input bar with search icon, clear `✕` button, and prefill support from route params.
   - **On Submit**: Typing updates the input text; search results filter when the guest presses return (or taps search icon). Filter chips (categories, tags) apply right away.
   - Quick natural language suggestion chips ("quiet pet friendly cabin with hot tub", "secluded beach house", "cozy cabin under $300").
   - Filtered results list with stay cards, pricing, reviews, and amenities. Empty state fallback with reset action.
5. **Trips & Profile Screens**:
   - `trips.tsx`: Trips tab screen showing "No upcoming trips" and a button to browse stays.
   - `profile.tsx`: Profile tab screen displaying user details, Clerk session info, and functional "Sign out" button.
6. **Local Stay Dataset (`src/data/stays.ts`)**:
   - Curated list of 8+ realistic rental stays matching Roam's theme (Modern Cabin with Hot Tub at Lake Arrowhead, Coastal Sanctuary at Big Sur, Aspen Alpine Lodge, Joshua Tree Stargazer Villa, Malibu Oceanfront Retreat, Catskills A-Frame, etc.) with high-res Unsplash photography, ratings, prices, and amenities.
7. **Animation & Interaction (`expo-animation` & `expo-design-system`)**:
   - Press feedback: `scale: 0.97` (120ms duration) on category chips, buttons, and `scale: 0.98` on cards.
   - Haptics: `Haptics.selectionAsync()` when toggling category chips; `Haptics.impactAsync(Light)` when tapping cards and buttons.
   - Design tokens: Plus Jakarta Sans typography, NativeWind v5 classes, and palette colors from `src/theme/`.

## Out of scope
- Property details screen (to be built from its dedicated design).
- Sanity Studio GROQ backend query.

## Steps

### 1. Create Local Stays Dataset (`src/data/stays.ts`)
- Define TypeScript `Stay` interface (`id`, `title`, `category`, `location`, `price`, `rating`, `reviewsCount`, `imageUri`, `tags`, `description`).
- Provide 8+ rich property records including the exact "Modern Cabin with Hot Tub" at Lake Arrowhead, CA from the design.

### 2. Configure NativeTabs Layout (`src/app/(tabs)/_layout.tsx`)
- Set up `NativeTabs` from `expo-router/native-tabs` with `tintColor="#111827"` (Ink tint).
- Configure triggers for `home`, `search` (`role="search"`), `trips`, and `profile` with SF Symbols for iOS and Material symbols for Android.

### 3. Build the Home Screen (`src/app/(tabs)/home.tsx`)
- Implement top header with `roam` logo, user greeting, and avatar.
- Implement title "Find your\nnext stay" with squircle search action button.
- Implement natural language purple banner ("quiet pet friendly cabin with hot tub") routing to `/search`.
- Implement interactive category pills with selection state and haptics.
- Implement full-bleed featured stay cards matching `assets/home.png` layout, spacing, badges, and chevron button with press animation.
- Remove old standalone `src/app/home.tsx` to maintain route cleanliness.

### 4. Build the Search Screen (`src/app/(tabs)/search.tsx`)
- Implement search input with clear button and on-submit execution (`onSubmitEditing`).
- Implement NLP quick query chips and category filter pills that apply immediately.
- Display filtered results with property cards, prices, and ratings.
- Handle empty state with reset button.

### 5. Build Trips & Profile Screens (`src/app/(tabs)/trips.tsx`, `profile.tsx`)
- Build placeholder Trips screen with call-to-action.
- Move profile info and Clerk "Sign out" flow into `profile.tsx`.

### 6. Verify & Typecheck
- Run `npx tsc --noEmit` and `npx eslint src/`.
- Verify navigation from Home to Search via search button, banner, and NativeTabs.
- Verify search query submission, category filtering, and safe area insets.

## Verification
- `npx tsc --noEmit` passes with 0 errors.
- `npx eslint src/` passes with 0 errors and 0 warnings.
- Home screen visuals match `assets/home.png` (header, greeting, banner, chips, card layout).
- NativeTabs render with Ink tint on iOS and Android.
- Search updates results on submit, and filter chips apply immediately.

## AGENTS.md updates
- Document NativeTabs navigation and stay data model under "Who owns what".

## Result
Successfully implemented the Home screen from `assets/home.png`, NativeTabs navigation bar (Home, Search, Trips, Profile), responsive Search screen with on-submit search filtering, category tabs, natural language suggestion chips, and subtle spring/scale animations with haptics. Passed `npx tsc --noEmit` and `npm run lint` with 0 errors.
