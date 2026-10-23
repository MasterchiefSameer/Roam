# 03 · Onboarding Carousel and Authentication Flow

Status: done

## Goal
Build a 3-slide swipeable Onboarding carousel screen matching the design reference, featuring high-quality Unsplash photos, location badges, distinct titles and copy for each slide, animated pagination indicators, and fixed action buttons that navigate to the authentication flow.

## Decisions
- Route structure:
  - `src/app/index.tsx`: The Onboarding carousel screen (entry screen for signed-out users, no new dependency).
  - `src/app/(auth)/sign-in.tsx`: The "Create your account" / Sign In authentication screen (Image 2).
  - `src/app/design-system.tsx`: Preserves the Design System Showcase at `/design-system`.
- 3 Swipeable Slides (same layout, fixed buttons):
  - **Slide 1**:
    - Image: Luxury lakefront cabin overlooking mountain sunset (Whistler, BC).
    - Location badge: "Whistler, BC".
    - Heading: "Find a stay that\nfits your story".
    - Copy: "From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip."
  - **Slide 2**:
    - Image: Scenic coastal architectural villa (Big Sur, CA).
    - Location badge: "Big Sur, CA".
    - Heading: "Breathtaking views,\ncrafted for you".
    - Copy: "Discover secluded coastal escapes and architectural gems curated to inspire your next adventure."
  - **Slide 3**:
    - Image: Cozy modern forest glass cabin with ambient evening lights (Aspen, CO).
    - Location badge: "Aspen, CO".
    - Heading: "Travel effortlessly,\nstay memorably".
    - Copy: "Simple bookings, transparent policies, and unforgettable memories waiting behind every door."
- Fixed elements on Onboarding:
  - Top header: "roam" text logo (left) and frosted "Skip" button (right).
  - Bottom card container:
    - 3-segment pagination indicator: active slide has elongated lavender pill (`w-10 h-1.5 bg-lavender rounded-full`), inactive slides have small dots (`w-2 h-1.5 bg-border-gray rounded-full`).
    - Fixed action buttons:
      - Primary: "Get started" with trailing arrow -> navigates to `/(auth)/sign-in`.
      - Secondary: "Continue with Google" -> navigates to `/(auth)/sign-in`.
  - "Skip" button jumps straight to `/(auth)/sign-in`.
- Authentication Screen (`src/app/(auth)/sign-in.tsx`):
  - Matching Image 2:
    - Header with circular back button and "roam" logo.
    - Heading: "Create\nyour account".
    - Subtitle: "Join roam to save your stays, get personalized recommendations and access them across all your devices."
    - Form fields with icons: Full name, Email address, Password (with eye toggle).
    - "Create account" button.
    - "or" divider.
    - "Continue with Google" and "Continue with Apple" buttons.
    - "Already have an account? Sign in" footer link.
- Implementation details:
  - Multi-slide carousel implemented using React Native `FlatList` with `pagingEnabled`, `horizontal`, `showsHorizontalScrollIndicator={false}`, tracking `onMomentumScrollEnd` to update the active slide index.
  - Buttons remain outside the swiper in a fixed bottom container.
  - Pure NativeWind v5 `className` utilities with design tokens from `global.css`.
  - `react-native-safe-area-context` for safe area insets.

## Out of scope
- Clerk SDK native configuration (handled when Clerk is integrated).

## Steps

### 1. Preserve Design System Showcase at `src/app/design-system.tsx`
Move current showcase content to `src/app/design-system.tsx`.

### 2. Build the Authentication Screen `src/app/(auth)/sign-in.tsx`
Create the Create Account / Sign In screen matching Image 2 with back navigation, form inputs, social auth buttons, and sign-in link.

### 3. Build the 3-Slide Onboarding Carousel `src/app/index.tsx`
Create the swipeable Onboarding screen matching Image 1:
- FlatList paging carousel for the 3 slides with Unsplash images and location badges.
- Dynamic 3-segment progress indicator tied to active slide.
- Fixed top bar ("roam" + "Skip") and fixed bottom card with headline, copy, and buttons.
- Connect "Get started", "Skip", and "Continue with Google" to navigate to `/(auth)/sign-in`.

### 4. Verify and Typecheck
- Run `npx tsc --noEmit` (0 errors).
- Run `npx eslint .` (0 errors, 0 warnings).

## Verification
- Test horizontal swiping across all 3 slides.
- Test active indicator pill updates as slides change.
- Test "Get started", "Skip", and "Continue with Google" navigate to `/(auth)/sign-in`.
- Test back button on `/(auth)/sign-in` returns to Onboarding.

## Result
3-slide swipeable Onboarding screen built matching Image 1 with Whistler, Big Sur, and Aspen slides, dynamic pagination bars, and fixed bottom card with action buttons. Connected to the "Create your account" Authentication screen matching Image 2 with circular back navigation, styled form fields, and social auth buttons. 0 typecheck errors, 0 lint warnings.

## AGENTS.md updates
- Documented Onboarding and Auth screen route conventions.
