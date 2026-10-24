import React, { useEffect } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthenticateWithRedirectCallback } from '@clerk/react';
import { useAuth } from '../context/auth-context';
import { colors } from '../theme';

export default function SSOCallbackScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      if (isLoaded) {
        if (isSignedIn) {
          router.replace('/home');
        } else {
          const timer = setTimeout(() => {
            if (isSignedIn) {
              router.replace('/home');
            } else {
              router.replace('/(auth)/sign-in');
            }
          }, 1200);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [isLoaded, isSignedIn, router]);

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surfaceGray }}>
        <AuthenticateWithRedirectCallback
          signInForceRedirectUrl="/home"
          signUpForceRedirectUrl="/home"
        />
        <ActivityIndicator size="large" color={colors.primaryYellow} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surfaceGray }}>
      <ActivityIndicator size="large" color={colors.primaryYellow} />
    </View>
  );
}
