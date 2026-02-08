/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetMeQuery } from '@/redux/features/users/users.api';
import {
  useLoginMutation,
  useRegisterMutation,
} from '@/redux/features/auth/auth.api';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  error: any;
  refetch: () => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string; error?: string }>;
  register: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
    isError,
  } = useGetMeQuery(undefined);
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoginLoading(true);
      try {
        const response = await loginMutation({ email, password }).unwrap();
        await refetch();
        setIsLoginLoading(false);
        const message =
          typeof response === 'object' && response && 'message' in response
            ? String(response.message)
            : 'Successfully signed in! Welcome back.';
        return { success: true, message };
      } catch (error: any) {
        setIsLoginLoading(false);
        const errorMessage =
          error?.data?.message || error?.message || 'Invalid email or password';
        return { success: false, error: errorMessage };
      }
    },
    [loginMutation, refetch]
  );

  const register = useCallback(
    async (email: string, password: string) => {
      setIsRegisterLoading(true);
      try {
        const response = await registerMutation({ email, password }).unwrap();
        setIsRegisterLoading(false);
        const message =
          typeof response === 'object' && response && 'message' in response
            ? String(response.message)
            : 'Account created successfully! Please sign in to continue.';
        return { success: true, message };
      } catch (error: any) {
        setIsRegisterLoading(false);
        const errorMessage =
          error?.data?.message || error?.message || 'Failed to create account';
        return { success: false, error: errorMessage };
      }
    },
    [registerMutation]
  );

  const value: AuthContextType = {
    user: user?.data || null,
    isAuthenticated: !!user?.data,
    // If there's an error (like 401), we should not be loading anymore
    isLoading: isLoading && !isError,
    isLoginLoading,
    isRegisterLoading,
    error,
    refetch,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
