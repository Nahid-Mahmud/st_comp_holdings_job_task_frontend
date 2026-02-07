'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import ReduxProvider from './providers/ReduxProvider';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <Toaster position="top-right" richColors closeButton />
      </AppRouterCacheProvider>
    </ReduxProvider>
  );
}
