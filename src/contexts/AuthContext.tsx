/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetMeQuery } from '@/redux/features/users/users.api';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from '@/redux/features/auth/auth.api';
import { deleteCookies } from '@/service/DeleteCookies';
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
  isLogoutLoading: boolean;
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
  logout: () => Promise<{ success: boolean; message?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
    isError,
  } = useGetMeQuery(undefined, {
    // Don't refetch on mount or window focus after logout
    refetchOnMountOrArgChange: false,
  });
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

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

  const logout = useCallback(async () => {
    setIsLogoutLoading(true);
    try {
      await logoutMutation({}).unwrap();
      // Clear cookies and local storage
      deleteCookies(['accessToken', 'refreshToken']);
      localStorage.removeItem('accessToken');
      setIsLogoutLoading(false);
      // The invalidatesTags in the mutation will clear the cache
      // which will make isAuthenticated false
      return { success: true, message: 'Logged out successfully' };
    } catch (error: any) {
      setIsLogoutLoading(false);
      // Even if API fails, clear local state
      deleteCookies(['accessToken', 'refreshToken']);
      localStorage.removeItem('accessToken');
      const errorMessage =
        error?.data?.message || error?.message || 'Logout failed';
      return { success: false, error: errorMessage };
    }
  }, [logoutMutation]);

  const value: AuthContextType = {
    user: user?.data || null,
    isAuthenticated: !!user?.data,
    // If there's an error (like 401), we should not be loading anymore
    isLoading: isLoading && !isError,
    isLoginLoading,
    isRegisterLoading,
    isLogoutLoading,
    error,
    refetch,
    login,
    register,
    logout,
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
