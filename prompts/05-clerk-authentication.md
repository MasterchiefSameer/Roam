# 05 · Connect Clerk Authentication with Google OAuth to Custom Auth Screens

Status: done

## Goal
Replace the mock authentication with real Clerk authentication using `@clerk/expo`, `expo-secure-store`, and `expo-auth-session`, keeping our custom state and bespoke UI screens intact: email sign-up and sign-in with verification code, Google OAuth via Clerk SSO, persistent session via secure token cache, protected route guards, and sign-out. Configure and verify Clerk MCP for agent operations.

## Decisions
1. **Clerk MCP Server for Agent**:
   - Configured in `~/.gemini/config/mcp_config.json` and `~/.gemini/antigravity/mcp_config.json` with `@clerk/agent-toolkit -p=local-mcp --tools=* --secret-key=...`. Verified via direct JSON-RPC handshake and Clerk REST API.
2. **Provider & Persistent Session**:
   - Wrap the root app tree in `src/app/_layout.tsx` with `<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>`.
   - Read `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` from `process.env`.
   - Use official `tokenCache` from `@clerk/expo/token-cache` (backed by `expo-secure-store` with encrypted keychain storage on iOS/Android, falling back to browser storage on web) so sessions survive app restarts.
3. **Custom State Architecture (`src/context/auth-context.tsx`)**:
   - Maintain the bespoke design and interface (`user`, `isSignedIn`, `isLoaded`, `pendingEmail`, `signUp`, `verifyEmail`, `signIn`, `sendSignInCode`, `signInWithGoogle`, `signInWithSocial`, `signOut`) backed by Clerk's current hooks (`useSignUp`, `useSignIn`, `useUser`, `useAuth`, `useClerk`, `useSSO`).
   - Retaining the existing context abstraction ensures our custom UI screens (`sign-up.tsx`, `verify.tsx`, `sign-in.tsx`, `home.tsx`) remain modular and clean without tight coupling.
4. **Email Sign-Up & Verification Flow**:
   - `signUp(fullName, email, password)` calls Clerk's `signUp.password({ emailAddress, password, firstName })` (or `signUp.create`), followed by `signUp.verifications.sendEmailCode()`.
   - Stores `pendingEmail` in state and navigates to `/(auth)/verify`.
   - In `/(auth)/verify`, entering the 6-digit email code calls `signUp.verifications.verifyEmailCode({ code })`.
   - When verified (`status === 'complete'`), calls `signUp.finalize()` to activate the session and route to `/home`.
   - Render `<View nativeID="clerk-captcha" />` on the sign-up screen for Clerk's bot protection.
5. **Email Sign-In Flow**:
   - Supports both password sign-in (`signIn.password({ emailAddress, password })`) and email OTP code sign-in (`sendSignInCode(email)` -> `signIn.emailCode.sendCode({ emailAddress })` -> `/(auth)/verify` -> `signIn.emailCode.verifyCode({ code })` -> `signIn.finalize()`).
   - On completion, `signIn.finalize()` sets the active session and navigates to `/home`.
6. **Google OAuth via Clerk Browser SSO (`useSSO`) & Cross-Platform Callbacks**:
   - Uses `useSSO()` from `@clerk/expo` with `strategy: 'oauth_google'`.
   - Cross-platform `getOAuthRedirectUrl()` helper resolves:
     - Web: `http://localhost:8081/sso-callback`
     - Mobile (Expo Go): `exp://${hostUri}/--/sso-callback`
     - Standalone Builds: `roam://sso-callback`
   - All redirect URLs whitelisted via Clerk Backend API (`https://api.clerk.com/v1/redirect_urls`).
   - Dedicated landing route in `src/app/sso-callback.tsx` with `<AuthenticateWithRedirectCallback>` on web and session verification before navigating to `/home` on native.
   - `useWarmUpBrowser` guarded by `Platform.OS === 'android'` to avoid unavailability errors on web/iOS.
   - Dedicated `googleLoading` state inside the Google button for clear tap feedback.
   - Identifies Google OAuth sign-ins via `clerkUser.externalAccounts` and exposes `user.isGoogleUser`.
7. **Apple Sign-In Removed**:
   - Removed Apple login buttons and mock handlers from `sign-in.tsx`, `sign-up.tsx`, and `auth-context.tsx` to streamline the authentication experience.
8. **Protected Routes & Route Guards**:
   - Layout guard in `src/app/(auth)/_layout.tsx`: If `isLoaded && isSignedIn`, redirect to `/home` (prevents authenticated users from seeing auth screens).
   - Screen guard in `src/app/home.tsx`: If `isLoaded && !isSignedIn`, redirect to `/(auth)/sign-in` (protects private app screens).
   - Handle loading state with `isLoaded` before checking `isSignedIn` to avoid flashing wrong screens.
9. **Sign-out Flow**:
   - Calls `signOut()` from `useAuth()` / `useClerk()`.
   - Clears tokens from SecureStore and redirects to Onboarding (`/`).

## Out of scope
- Prebuilt Clerk UI modal components (`<AuthView />` / `<UserButton />`), since Roam uses its custom design system.
- Native Apple sign-in buttons (mocked for now, as Apple credentials require native provisioning profiles and entitlements).
- Backend API route token validation (scheduled for subsequent milestone).

## Steps

### 1. Configure Clerk Provider & Token Cache in Root Layout
- In `src/app/_layout.tsx`, import `ClerkProvider` from `@clerk/expo` and `tokenCache` from `@clerk/expo/token-cache`.
- Validate `process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`.
- Wrap `<SafeAreaProvider>` and `<AuthProvider>` inside `<ClerkProvider>`.

### 2. Implement Clerk-Powered Auth Context (`src/context/auth-context.tsx`)
- Replace mock state with Clerk hooks: `useSignUp`, `useSignIn`, `useUser`, `useAuth`, `useClerk`, `useSSO`.
- Map Clerk's user object (`user.id`, `user.fullName` / `firstName`, primary email address, `imageUrl`) to Roam's `User` type.
- Implement `signUp`: invokes `signUp.password(...)` and `signUp.verifications.sendEmailCode()`.
- Implement `verifyEmail`: checks whether a sign-up or sign-in attempt is pending, verifies the 6-digit code via `signUp.verifications.verifyEmailCode` or `signIn.emailCode.verifyCode`, and calls `.finalize()`.
- Implement `signIn`: supports `signIn.password(...)` and provides `sendSignInCode` for email OTP.
- Implement `signInWithSocial`: for Google, invokes `startSSOFlow({ strategy: 'oauth_google' })` and sets active session.
- Implement `signOut`: calls `useClerk().signOut()`.
- Export `isLoaded`, `isSignedIn`, `user`, and action methods.

### 3. Add Bot Protection Captcha & Surface Clerk Errors in Screens
- Add `<View nativeID="clerk-captcha" />` inside `src/app/(auth)/sign-up.tsx`.
- Enhance error handling across `sign-up.tsx`, `verify.tsx`, and `sign-in.tsx` to surface clear Clerk error messages (`isClerkAPIResponseError(err) ? err.errors[0]?.longMessage || err.errors[0]?.message : ...`).
- Wire Google buttons to `signInWithSocial('google')`.
- Wire resend button in `verify.tsx` to trigger `signUp.verifications.sendEmailCode()` or `signIn.emailCode.sendCode()`.

### 4. Implement Route Guards for Protected Routes
- In `src/app/(auth)/_layout.tsx`, add an auth check: if `isLoaded && isSignedIn`, redirect to `/home`.
- In `src/app/home.tsx`, add protection: if `isLoaded && !isSignedIn`, redirect to `/(auth)/sign-in`.
- Display a smooth loading state while `!isLoaded`.

### 5. Verify & Typecheck
- Run `npx tsc --noEmit` to verify type safety.
- Run `npx eslint .` to check lint compliance.
- Test sign-up, verification code delivery, sign-in, Google OAuth flow, session persistence on reload, and sign-out.

## Verification
- `npx tsc --noEmit` passes with 0 errors.
- `npx eslint .` passes with 0 errors and 0 warnings.
- End-to-end verification:
  - New user sign-up with email triggers 6-digit code email from Clerk.
  - Verification screen accepts the code, completes the session, and lands on `/home`.
  - Google OAuth button triggers Clerk SSO flow.
  - User details (`fullName`, `email`) reflect the live Clerk user.
  - Sign-out clears the session and returns to Onboarding.
  - Sign-in with the created credentials succeeds and returns to `/home`.

## Result
Real Clerk authentication integrated across all custom screens with email sign-up (6-digit code verification), password and email OTP sign-in, Google OAuth via Clerk SSO, persistent session with SecureStore token cache, and route guards on auth screens and home screen. All TypeScript and ESLint checks pass with 0 errors.

## AGENTS.md updates
- Update "Who owns what" to document active Clerk authentication and Google OAuth integration via `@clerk/expo` and `expo-secure-store`.
