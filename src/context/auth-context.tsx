import React, { createContext, useContext, useState, useMemo } from 'react';
import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Linking from 'expo-linking';
import {
  useUser,
  useAuth as useClerkAuth,
  useSignUp,
  useSignIn,
  useClerk,
  useSSO,
} from '@clerk/expo';

function getOAuthRedirectUrl(): string {
  if (Platform.OS === 'web') {
    return Linking.createURL('/sso-callback');
  }

  const isExpoGo =
    (typeof globalThis !== 'undefined' && !!(globalThis as any).expo?.modules?.ExpoGo) ||
    Constants.appOwnership === 'expo' ||
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient ||
    !!Constants.expoGoConfig;

  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants.expoGoConfig as { debuggerHost?: string } | null)?.debuggerHost;

  if (isExpoGo && hostUri) {
    return `exp://${hostUri}/--/sso-callback`;
  }

  return 'roam://sso-callback';
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  isGoogleUser?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  pendingEmail: string | null;
  flowType: 'sign_up' | 'sign_in' | null;
  signUp: (fullName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (code: string) => Promise<{ success: boolean; error?: string }>;
  resendVerificationCode: () => Promise<{ success: boolean; error?: string }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; needsVerification?: boolean; error?: string }>;
  sendSignInCode: (email: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; cancelled?: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function extractErrorMessage(err: any): string {
  if (!err) return 'An unexpected error occurred. Please try again.';
  if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
    const firstErr = err.errors[0];
    return firstErr.longMessage || firstErr.message || 'An error occurred.';
  }
  return err.longMessage || err.message || 'An unexpected error occurred. Please try again.';
}

function extractErrorCode(err: any): string | undefined {
  if (!err) return undefined;
  if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
    return err.errors[0]?.code;
  }
  return err.code;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { isSignedIn, isLoaded: isAuthLoaded } = useClerkAuth();
  const { signOut: clerkSignOut } = useClerk();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [flowType, setFlowType] = useState<'sign_up' | 'sign_in' | null>(null);

  const isLoaded = isUserLoaded && isAuthLoaded;

  const user: User | null = useMemo(() => {
    if (!clerkUser) return null;
    const primaryEmail =
      clerkUser.primaryEmailAddress?.emailAddress ||
      clerkUser.emailAddresses?.[0]?.emailAddress ||
      '';
    const fullName =
      clerkUser.fullName ||
      (clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : '') ||
      primaryEmail.split('@')[0] ||
      'Traveler';

    const isGoogleUser =
      clerkUser.externalAccounts?.some(
        (acc: any) =>
          acc.provider === 'google' ||
          acc.verification?.strategy === 'oauth_google' ||
          acc.identification?.provider === 'google'
      ) || false;

    return {
      id: clerkUser.id,
      fullName,
      email: primaryEmail,
      avatarUrl: clerkUser.imageUrl,
      isGoogleUser,
    };
  }, [clerkUser]);

  const handleSignUp = async (fullName: string, email: string, password: string) => {
    try {
      const trimmedEmail = email.trim();
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || 'Traveler';
      const lastName = nameParts.slice(1).join(' ') || undefined;

      // Reset any previous attempt
      if (signUp.id) {
        await signUp.reset();
      }

      const { error: signUpError } = await signUp.password({
        emailAddress: trimmedEmail,
        password,
        firstName,
        lastName,
      });

      if (signUpError) {
        return { success: false, error: extractErrorMessage(signUpError) };
      }

      // Send 6-digit email code
      const { error: sendCodeError } = await signUp.verifications.sendEmailCode();
      if (sendCodeError) {
        return { success: false, error: extractErrorMessage(sendCodeError) };
      }

      setPendingEmail(trimmedEmail);
      setFlowType('sign_up');
      return { success: true };
    } catch (err) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  const handleVerifyEmail = async (code: string) => {
    try {
      const trimmedCode = code.trim();

      if (flowType === 'sign_in') {
        const isSecondFactor =
          signIn.status === 'needs_second_factor' || signIn.status === 'needs_client_trust';
        const { error: verifyError } = isSecondFactor
          ? await signIn.mfa.verifyEmailCode({ code: trimmedCode })
          : await signIn.emailCode.verifyCode({ code: trimmedCode });
        if (verifyError) {
          return { success: false, error: extractErrorMessage(verifyError) };
        }

        if (signIn.status === 'complete') {
          const { error: finalizeError } = await signIn.finalize();
          if (finalizeError) {
            return { success: false, error: extractErrorMessage(finalizeError) };
          }
          setPendingEmail(null);
          setFlowType(null);
          return { success: true };
        }

        return {
          success: false,
          error: `Additional sign-in steps required (${signIn.status}).`,
        };
      }

      // Sign-up flow default
      const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code: trimmedCode });
      if (verifyError) {
        return { success: false, error: extractErrorMessage(verifyError) };
      }

      if (signUp.status === 'complete') {
        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) {
          return { success: false, error: extractErrorMessage(finalizeError) };
        }
        setPendingEmail(null);
        setFlowType(null);
        return { success: true };
      }

      return {
        success: false,
        error: `Additional sign-up steps required (${signUp.status}).`,
      };
    } catch (err) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  const handleResendCode = async () => {
    try {
      if (flowType === 'sign_in') {
        const isSecondFactor =
          signIn.status === 'needs_second_factor' || signIn.status === 'needs_client_trust';
        const { error } = isSecondFactor
          ? await signIn.mfa.sendEmailCode()
          : await signIn.emailCode.sendCode();
        if (error) return { success: false, error: extractErrorMessage(error) };
        return { success: true };
      }

      const { error } = await signUp.verifications.sendEmailCode();
      if (error) return { success: false, error: extractErrorMessage(error) };
      return { success: true };
    } catch (err) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const trimmedEmail = email.trim();

      // Reset any previous attempt
      if (signIn.id) {
        await signIn.reset();
      }

      const { error: passwordError } = await signIn.password({
        emailAddress: trimmedEmail,
        password,
      });

      if (passwordError) {
        const errCode = extractErrorCode(passwordError);
        const shouldFallbackToEmailCode =
          errCode === 'strategy_for_user_invalid' ||
          errCode === 'form_password_not_set' ||
          errCode === 'invalid_strategy';

        if (shouldFallbackToEmailCode) {
          if (signIn.id) {
            await signIn.reset();
          }
          const { error: codeError } = await signIn.emailCode.sendCode({
            emailAddress: trimmedEmail,
          });
          if (codeError) {
            return { success: false, error: extractErrorMessage(codeError) };
          }
          setPendingEmail(trimmedEmail);
          setFlowType('sign_in');
          return { success: true, needsVerification: true };
        }

        return { success: false, error: extractErrorMessage(passwordError) };
      }

      if (signIn.status === 'complete') {
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
          return { success: false, error: extractErrorMessage(finalizeError) };
        }
        return { success: true, needsVerification: false };
      }

      if (signIn.status === 'needs_first_factor') {
        const { error: codeError } = await signIn.emailCode.sendCode();
        if (codeError) {
          return { success: false, error: extractErrorMessage(codeError) };
        }
        setPendingEmail(trimmedEmail);
        setFlowType('sign_in');
        return { success: true, needsVerification: true };
      }

      if (signIn.status === 'needs_client_trust' || signIn.status === 'needs_second_factor') {
        const { error: mfaError } = await signIn.mfa.sendEmailCode();
        if (mfaError) {
          return { success: false, error: extractErrorMessage(mfaError) };
        }
        setPendingEmail(trimmedEmail);
        setFlowType('sign_in');
        return { success: true, needsVerification: true };
      }

      return {
        success: false,
        error: `Sign in status: ${signIn.status}. Please complete verification.`,
      };
    } catch (err) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  const handleSendSignInCode = async (email: string) => {
    try {
      const trimmedEmail = email.trim();
      if (signIn.id) {
        await signIn.reset();
      }
      const { error } = await signIn.emailCode.sendCode({ emailAddress: trimmedEmail });
      if (error) {
        return { success: false, error: extractErrorMessage(error) };
      }
      setPendingEmail(trimmedEmail);
      setFlowType('sign_in');
      return { success: true };
    } catch (err) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const redirectUrl = getOAuthRedirectUrl();
      console.log('[Google SSO] Starting on', Platform.OS, 'with redirectUrl:', redirectUrl);
      const {
        createdSessionId,
        setActive,
        authSessionResult,
        signIn: ssoSignIn,
        signUp: ssoSignUp,
      } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl,
      });

      console.log('[Google SSO] Flow finished:', {
        createdSessionId,
        authSessionType: authSessionResult?.type,
        signInStatus: ssoSignIn?.status,
        signUpStatus: ssoSignUp?.status,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        return { success: true };
      }

      if (!authSessionResult) {
        return {
          success: false,
          error: 'Authentication is still initializing. Please wait a moment and try again.',
        };
      }

      // No createdSessionId returned means user closed or cancelled the modal
      return { success: false, cancelled: true };
    } catch (err: any) {
      if (err?.code === 'SIGN_IN_CANCELLED' || err?.code === '-5') {
        return { success: false, cancelled: true };
      }
      console.warn('[Google SSO] Error:', err);
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  const handleSignOut = async () => {
    await clerkSignOut();
    setPendingEmail(null);
    setFlowType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn: !!isSignedIn,
        isLoaded,
        pendingEmail,
        flowType,
        signUp: handleSignUp,
        verifyEmail: handleVerifyEmail,
        resendVerificationCode: handleResendCode,
        signIn: handleSignIn,
        sendSignInCode: handleSendSignInCode,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
