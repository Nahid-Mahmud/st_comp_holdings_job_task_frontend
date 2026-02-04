import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#002f70',
      light: '#E8F4F8',
      dark: '#001a42',
    },
    secondary: {
      main: '#666666',
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
    fontFamily: '"Proxima Nova", "Red Hat Display", sans-serif',
  },
});
