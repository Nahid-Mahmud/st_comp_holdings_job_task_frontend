'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

// Zod schemas for validation
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const {
    login,
    register,
    isLoginLoading,
    isRegisterLoading,
    isAuthenticated,
    isLoading,
  } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Redirect authenticated users away from auth page
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/specialists');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setEmail('');
    setPassword('');
    setSignInError('');
    setSignUpError('');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');

    // Validate with Zod
    const result = signInSchema.safeParse({ email, password });

    if (!result.success) {
      const firstError = result.error.issues[0];
      setSignInError(firstError.message);
      return;
    }

    const response = await login(email, password);

    if (response.success) {
      setSuccessMessage(response.message || 'Successfully signed in!');
      setOpenSnackbar(true);
      setEmail('');
      setPassword('');
      router.push('/specialists');
    } else {
      setSignInError(response.error || 'Failed to sign in');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');

    // Validate with Zod
    const result = signUpSchema.safeParse({ email, password });

    if (!result.success) {
      const firstError = result.error.issues[0];
      setSignUpError(firstError.message);
      return;
    }

    const response = await register(email, password);

    if (response.success) {
      setSuccessMessage(response.message || 'Account created successfully!');
      setOpenSnackbar(true);
      setTabValue(0);
      setEmail('');
      setPassword('');
    } else {
      setSignUpError(response.error || 'Failed to create account');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Prevent showing auth form for authenticated users
  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E8F4F8 0%, #ffffff 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              py: 3,
              px: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              ST Comp Holdings
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Manage your services and business operations
            </Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="auth tabs"
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  py: 2,
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                },
              }}
            >
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>
          </Box>

          <Box sx={{ px: 4 }}>
            <TabPanel value={tabValue} index={0}>
              <SignInForm
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSignIn={handleSignIn}
                signInError={signInError}
                isLoginLoading={isLoginLoading}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <SignUpForm
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSignUp={handleSignUp}
                signUpError={signUpError}
                isRegisterLoading={isRegisterLoading}
              />
            </TabPanel>
          </Box>

          <Box
            sx={{
              py: 2,
              px: 4,
              bgcolor: 'grey.50',
              textAlign: 'center',
              mt: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {tabValue === 0 ? (
                <>
                  Don&apos;t have an account?{' '}
                  <Box
                    component="span"
                    onClick={() => setTabValue(1)}
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign up
                  </Box>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Box
                    component="span"
                    onClick={() => setTabValue(0)}
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign in
                  </Box>
                </>
              )}
            </Typography>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
