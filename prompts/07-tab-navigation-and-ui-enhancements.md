# 07 · Tab Bar Safe Area Adaptation and Mobile UI Polish

Status: done

## Goal
Elevate the bottom tab navigator (`home`, `search`, `trips`, `profile`) to automatically adapt to Android 3-button navigation, gesture pills, and iOS home indicators using dynamic safe area insets, enforce a crisp white-and-ink theme that never turns black, fix home listing card image collapse with explicit sizing, prevent stay title truncation, and enhance user avatar fallbacks with Google OAuth badges.

## Decisions
1. **Expo Router `Tabs` over `NativeTabs`**:
   - Replaced experimental `NativeTabs` with standard `Tabs` from `expo-router` to guarantee cross-platform styling control.
   - Enforce explicit Surface White (`#FFFFFF`) background with `#E5E7EB` top border, avoiding Android system dark-mode override.
   - Tab active text and icons use Ink (`#0B0B1A`) with a subtle Primary Yellow (`#FFC629`) dot indicator; inactive tabs use Muted Gray (`#6B7280`).
2. **Dynamic Safe Area Bottom Inset**:
   - Tab bar height and padding calculate dynamically via `useSafeAreaInsets()`:
     - `bottomPadding = insets.bottom > 0 ? insets.bottom : (Platform.OS === 'android' ? 12 : 8)`
     - `tabHeight = 56 + bottomPadding`
   - In Android 3-button navigation mode, this lifts tab buttons by ~48px so they remain completely above Back, Home, and Recents buttons.
3. **Explicit Dimensions for `expo-image`**:
   - In React Native, `className="w-full h-full"` on `expo-image` can collapse to 0x0 without pixel constraints.
   - Set `style={{ width: '100%', height: '100%' }}` on all stay card photos in `home.tsx` to match `search.tsx`.
   - Set `style={{ width: '100%', height: '100%', borderRadius: 9999 }}` on user avatars in `home.tsx` and `profile.tsx`.
4. **Stay Title Text Flow & No Truncation**:
   - Replaced literal `\n` in titles with a space (`stay.title.replace('\n', ' ')`).
   - Replaced `max-w-[78%]` with `flex-1` and `gap-3` layout next to the circular chevron button.
   - Added `shrink-0 mb-0.5` to the chevron button and expanded the bottom gradient overlay to `min-h-[165px]` so titles like "Modern Cabin with Hot Tub" fit naturally across two lines.
5. **Avatar Fallbacks & Google OAuth Badge**:
   - Added `getInitials` helper to show initials (e.g. "JD" or "RO") inside the golden ring if `user.avatarUrl` fails or is not provided.
   - Added mini Google logo badge (`logo-google` in `#EA4335`) at the bottom-right corner when `user.isGoogleUser` is true.

## Out of scope
- Dark mode theme toggle (Roam design system uses white surfaces and golden accents).
- Custom animated tab indicator transitions.

## Steps

### 1. Tab Bar Navigation Overhaul (`src/app/(tabs)/_layout.tsx`)
- Migrate from `NativeTabs` to `Tabs` from `expo-router`.
- Read `useSafeAreaInsets()` and compute dynamic `tabHeight` and `bottomPadding`.
- Style tab bar with Surface White (`#FFFFFF`), border `#E5E7EB`, active `#0B0B1A`, inactive `#6B7280`, and active dot indicator `#FFC629`.

### 2. Fix Home Stay Card Images & Title Truncation (`src/app/(tabs)/home.tsx`)
- Add `style={{ width: '100%', height: '100%' }}` to listing card `<Image />`.
- Clean title strings with `stay.title.replace('\n', ' ')`, give title container `flex-1`, and lock chevron button with `shrink-0`.
- Increase gradient overlay height to `min-h-[165px]`.

### 3. Polish Avatar Display & Fallbacks (`src/app/(tabs)/home.tsx` & `profile.tsx`)
- Add `getInitials(fullName, email)` helper.
- Render initials inside golden accent circle when image is not present or errors.
- Display mini Google badge if `user.isGoogleUser`.
- Fix profile avatar image with `style={{ width: '100%', height: '100%', borderRadius: 9999 }}`.

### 4. Verify & Typecheck
- Run `npx tsc --noEmit` and `npx eslint src` to ensure 0 errors and 0 warnings.
- Test on 3-button navigation, gesture navigation, and iOS simulator.

## Verification
- `npx tsc --noEmit` passes with 0 errors.
- `npx eslint src` passes with 0 errors and 0 warnings.
- Tabs sit cleanly above Android 3-button navigation bar (Back/Home/Recents).
- Tab footer stays white (`#FFFFFF`) regardless of device dark mode setting.
- Home stay images render crisply.
- Card titles render all words without clipping.
- Avatar shows photo or initials with Google badge.

## Result
Bottom navigation tab bar completely overhauled with dynamic safe area insets for Android 3-button navigation, edge-to-edge layout, and iOS home indicators. Tab bar maintains pure white background with gold indicators. Home listing card images and avatars render reliably with explicit dimensions and initials fallbacks, and stay titles flow naturally without truncation.

## AGENTS.md updates
- Updated "Navigation" memory entry to document `expo-router`'s `Tabs` with white surface and gold indicators.
