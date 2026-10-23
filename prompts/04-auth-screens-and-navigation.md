# 04 · Signup, Verification, and Sign-in Screens with Mock Auth Session

Status: done

## Goal
Build the Signup, Email Verification (accepting Clerk's test code 424242), and Sign-in screens derived from the attached design, with realistic form interactions and a React Context-based mock session driving navigation and redirects, ending in a placeholder signed-in home screen with a Sign Out option.

## Decisions
1. **Visual Style**:
   - Both Sign-in and Verification derive from the attached Sign-up design:
     - Same header (circular back button + "roam" text logo).
     - Same typography, spacing, and button styling.
     - Sign-in: Email address + Password, "Forgot password?" link (mocked), "Sign in" primary button, "or" divider, Google & Apple buttons, and link to Sign up.
     - Verification: 6-digit code boxes with active focus styling, subtitle showing targeted email, resend countdown timer with "Resend code", and "Verify and continue" primary button.
2. **Verification Mechanism**:
   - 6-digit email code (Clerk's default for custom flows).
   - After sign-up, user enters the code sent to their email.
   - Mock verification accepts `424242` (as well as any 6-digit input in mock mode).
3. **Session & Redirection**:
   - React Context (`src/context/auth-context.tsx`) provides the mock session (`user`, `isSignedIn`, `signUp`, `verifyEmail`, `signIn`, `signInWithSocial`, `signOut`), structured to directly swap with Clerk later.
   - Successful sign-in or verified sign-up lands on a simple signed-in screen (`src/app/home.tsx`) displaying `"Signed in as [Name / Email]"` and a `"Sign out"` button that clears the session and returns to Onboarding (`/`).
4. **Navigation Routes**:
   - `src/app/index.tsx`: Onboarding screen ("Get started" -> `/(auth)/sign-up`, "Skip" -> `/(auth)/sign-in`).
   - `src/app/(auth)/_layout.tsx`: Auth group Stack layout (`headerShown: false`).
   - `src/app/(auth)/sign-up.tsx`: Create Account screen.
   - `src/app/(auth)/verify.tsx`: Verification screen.
   - `src/app/(auth)/sign-in.tsx`: Sign-in screen.
   - `src/app/home.tsx`: Signed-in screen with Sign Out.

## Out of scope
- Clerk SDK native libraries installation (mock session provides the exact interface for the upcoming Clerk feature).

## Steps

### 1. Create Mock Auth Context and wrap Root Layout
Create `src/context/auth-context.tsx` and integrate `<AuthProvider>` in `src/app/_layout.tsx`.

### 2. Build the Signup Screen `src/app/(auth)/sign-up.tsx`
Implement the "Create your account" screen with Full name, Email, Password, Google/Apple buttons, and navigation to `/(auth)/verify`.

### 3. Build the Verification Screen `src/app/(auth)/verify.tsx`
Implement the 6-digit email code screen with `424242` verification, auto-focus digit cells, and resend timer.

### 4. Build the Sign-in Screen `src/app/(auth)/sign-in.tsx`
Implement the "Welcome back" screen with Email, Password, "Forgot password?", "Sign in" button, and Google/Apple buttons.

### 5. Build Placeholder Home Screen `src/app/home.tsx`
Implement the signed-in screen showing `"Signed in as ..."` and a `"Sign out"` button that clears the session and redirects to Onboarding (`/`).

### 6. Connect Routes & Update Onboarding `src/app/index.tsx`
Connect "Get started" -> `/(auth)/sign-up`, "Skip" -> `/(auth)/sign-in`, and social login buttons.

### 7. Run Verification and Typechecks
Run `npx tsc --noEmit` and `npx eslint .`.

## Verification
- Test Onboarding -> Sign-up -> Verify (code 424242) -> Home -> Sign out -> Onboarding.
- Test Onboarding -> Sign-in -> Home -> Sign out.
- Test Sign-up <-> Sign-in switching via footer links.
- Test 6-digit OTP code input boxes auto-advance and backspace.

## Result
Signup, Email Verification (mocking Clerk code 424242), Sign-in, and Placeholder Home screens successfully built with React Context mock session architecture and smooth navigation flows. 0 type errors, 0 lint warnings.

## AGENTS.md updates
- Document mock auth context and screen routes under "Who owns what".
