import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#002f70',
      light: '#E8F4F8',
      dark: '#001a42',
    },
    secondary: {
      main: '#071331',
    },
    success: {
      main: '#10B981',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
  },
  typography: {
    fontFamily: 'var(--font-proxima-nova), "Proxima Nova", sans-serif',
  },
});
