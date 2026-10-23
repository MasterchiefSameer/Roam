# 02 · Implement Design System from Reference

Status: done

## Goal
Implement the complete Roam design system derived from the design reference image (Brand, Color Palette, Typography, Buttons, Inputs, Filter Chips, Listing Card, Policy Card, Profile Row, Liquid Glass Tab Bar, Iconography, Segmented Control, Toggles/Steppers, Alerts, and Badges) following the `expo-design-system` skill and NativeWind v5 standards.

## Decisions
- Follow the `expo-design-system` structure:
  - Tokens organized under `src/theme/` (`colors.ts`, `spacing.ts`, `typography.ts`, `radius.ts`, `shadows.ts`, `motion.ts`, `index.ts`).
  - `@theme` CSS variables registered in `global.css` so NativeWind v5 / Tailwind v4 `className` utilities (`bg-primary-yellow`, `text-primary`, `rounded-pill`, etc.) and TypeScript token imports both work seamlessly.
  - Used `react-native-safe-area-context` for safe area handling (replacing deprecated React Native `SafeAreaView`).
  - Styled components and showcase views with pure NativeWind `className` utilities instead of `StyleSheet.create`.
- Exact colors from panel 02:
  - `primaryYellow`: `#FFC629`
  - `lavender`: `#C9B4FF`
  - `textPrimary`: `#0B0B1A`
  - `textSecondary`: `#6B7280`
  - `surfaceWhite`: `#FFFFFF`
  - `surfaceGray`: `#F4F5F7`
  - `borderGray`: `#E5E7EB`
  - `glassBlur`: `rgba(255, 255, 255, 0.7)`
- Semantic colors for alerts & badges:
  - Success: `#059669` (bg `#ECFDF5`, border `#A7F3D0`)
  - Error: `#DC2626` (bg `#FEF2F2`, border `#FECACA`)
  - Guest Favorite: `#B45309` (bg `#FEF3C7`, border `#FDE68A`)
  - Superhost: `#4F46E5` (bg `#EEF2FF`, border `#C7D2FE`)
  - Discount: `#9333EA` (bg `#F3E8FF`, border `#E9D5FF`)
- Typography:
  - Use `Plus Jakarta Sans` Google Font via `npx expo install @expo-google-fonts/plus-jakarta-sans expo-font` with system geometric fallbacks.
  - Scale: Display (56px, bold), Heading (28px, bold), Title (20px, semibold), Body (16px, regular), Caption (14px, medium), Button (17px, semibold).
- Icons:
  - Install `@expo/vector-icons` for cross-platform vector iconography matching the 2px outline aesthetic (Feather / Ionicons).
- Components in `src/components/`:
  - `ThemedText` (`variant`: display, heading, title, body, caption, button).
  - `Button` (`variant`: primary, secondary, ghost; `size`: sm, md, lg; icon & loading support).
  - `IconButton` (circular/pill with surface-gray or bordered background).
  - `Input` & `SearchInput` (with default, focused with lavender border, password toggle).
  - `FilterChip` & `CategoryChip` (active lavender/dark, inactive surface gray).
  - `Badge` (guest favorite, new, discount, superhost).
  - `AlertBanner` (success, error with dismiss).
  - `SegmentedControl` (pill container with active dark pill).
  - `Toggle` (yellow switch) & `Stepper` (count increment/decrement).
  - `ListingCard` (image, favorite heart button, title, location, rating, amenities, price).
  - `PolicyCard` (lavender icon box, title, description, chevron).
  - `ProfileRow` (icon, label, chevron, divider).
  - `LiquidGlassTabBar` (floating frosted capsule with glowing yellow active indicator).
- Home screen showcase:
  - Render an interactive, beautifully structured Design System Showcase in `src/app/index.tsx` covering all 15 panels from the reference sheet.

## Out of scope
- Multi-page navigation flows or booking checkout logic (belongs in subsequent feature plans).
- Backend / Sanity GROQ queries (belongs in content integration plans).

## Steps

### 1. Install required packages
Run:
`npx expo install @expo/vector-icons @expo-google-fonts/plus-jakarta-sans expo-font`

### 2. Configure Design Tokens and Tailwind CSS v4 Theme
- Create `src/theme/colors.ts`, `src/theme/spacing.ts`, `src/theme/typography.ts`, `src/theme/radius.ts`, `src/theme/shadows.ts`, `src/theme/motion.ts`, and `src/theme/index.ts`.
- Update `global.css` with `@theme` block mapping colors, font families, radius, and spacing to Tailwind utilities.

### 3. Build Core Primitives in `src/components/`
- Build `ThemedText` with font family and text styles.
- Build `Button` and `IconButton` with touch feedback, pressed states, and accessibility props.
- Build `Input` with focus state (lavender border), search variant, and password visibility toggle.
- Build `FilterChip` and `CategoryChip` with active/inactive states.
- Build `Badge` for listing and status tags.
- Build `AlertBanner` for success and error alerts.
- Build `SegmentedControl` (List / Map).
- Build `Toggle` and `Stepper`.

### 4. Build Compound Components
- Build `ListingCard` matching panel 07.
- Build `PolicyCard` matching panel 08.
- Build `ProfileRow` matching panel 09.
- Build `LiquidGlassTabBar` matching panel 10.

### 5. Create Design System Showcase in `src/app/index.tsx`
- Replace `src/app/index.tsx` with a showcase view divided into sections 01–15 matching the reference design layout.
- Ensure all interactive states (toggles, steppers, inputs, chips, segmented controls) are interactive and responsive.

### 6. Verify and Typecheck
- Run `npx tsc --noEmit` to verify 0 type errors.
- Run `npx eslint .` to verify clean code quality.

## Result
Complete design system implemented with tokens in `src/theme/`, CSS variables in `global.css`, 15 reusable components in `src/components/`, and a comprehensive interactive showcase in `src/app/index.tsx` matching panels 01–15 of the reference design. 0 type errors, 0 lint warnings.

## AGENTS.md updates
- Add design system tokens and component conventions to AGENTS.md.
