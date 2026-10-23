import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  pendingEmail: string | null;
  signUp: (fullName: string, email: string, password: string) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithSocial: (provider: 'google' | 'apple') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingName, setPendingName] = useState<string>('');

  const signUp = async (fullName: string, email: string) => {
    setPendingName(fullName);
    setPendingEmail(email);
    return true;
  };

  const verifyEmail = async (code: string) => {
    // Accepts Clerk's official test code '424242' or valid 6-digit input in mock mode
    if (code === '424242' || code.length === 6) {
      const email = pendingEmail || 'guest@example.com';
      const name = pendingName || email.split('@')[0];
      setUser({
        id: 'user_mock_123',
        fullName: name,
        email,
      });
      setPendingEmail(null);
      setPendingName('');
      return { success: true };
    }
    return { success: false, error: 'Invalid verification code. Enter 424242 to continue.' };
  };

  const signIn = async (email: string) => {
    if (!email) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    setUser({
      id: 'user_mock_123',
      fullName: email.split('@')[0],
      email,
    });
    return { success: true };
  };

  const signInWithSocial = async (provider: 'google' | 'apple') => {
    setUser({
      id: `user_${provider}_123`,
      fullName: provider === 'google' ? 'Google User' : 'Apple User',
      email: `${provider}.user@example.com`,
    });
  };

  const signOut = async () => {
    setUser(null);
    setPendingEmail(null);
    setPendingName('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn: !!user,
        pendingEmail,
        signUp,
        verifyEmail,
        signIn,
        signInWithSocial,
        signOut,
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
