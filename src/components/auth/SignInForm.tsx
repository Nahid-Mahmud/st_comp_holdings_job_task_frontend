import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';

interface SignInFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignIn: (e: React.FormEvent) => void;
  signInError: string;
  isLoginLoading: boolean;
}

export default function SignInForm({
  email,
  password,
  setEmail,
  setPassword,
  handleSignIn,
  signInError,
  isLoginLoading,
}: SignInFormProps) {
  return (
    <form onSubmit={handleSignIn}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: 'text.primary' }}
        >
          Welcome Back
        </Typography>

        {signInError && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {signInError}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isLoginLoading}
          sx={{
            mt: 2,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {isLoginLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Box>
    </form>
  );
}
