import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';

interface SignUpFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignUp: (e: React.FormEvent) => void;
  signUpError: string;
  isRegisterLoading: boolean;
}

export default function SignUpForm({
  email,
  password,
  setEmail,
  setPassword,
  handleSignUp,
  signUpError,
  isRegisterLoading,
}: SignUpFormProps) {
  return (
    <form onSubmit={handleSignUp}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: 'text.primary' }}
        >
          Create Account
        </Typography>

        {signUpError && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {signUpError}
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
          placeholder="Create a password (min. 6 characters)"
          autoComplete="new-password"
          helperText="Password must be at least 6 characters long"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isRegisterLoading}
          sx={{
            mt: 2,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {isRegisterLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Box>
    </form>
  );
}
