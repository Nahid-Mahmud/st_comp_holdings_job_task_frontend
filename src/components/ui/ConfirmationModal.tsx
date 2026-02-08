import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from './Button';

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: '400px',
        },
      }}
    >
      <DialogTitle
        id="confirmation-dialog-title"
        sx={{
          fontWeight: 700,
          fontSize: '1.25rem',
          color: '#1a1a1a',
          fontFamily: 'Red Hat Display, sans-serif',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="confirmation-dialog-description"
          sx={{
            color: '#666666',
            fontSize: '0.875rem',
            fontFamily: 'Proxima Nova, sans-serif',
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          disabled={isLoading}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderColor: '#d1d5db',
            color: '#6b7280',
            '&:hover': {
              borderColor: '#9ca3af',
              bgcolor: '#f9fafb',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isLoading}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#dc2626',
            color: 'white',
            '&:hover': {
              bgcolor: '#b91c1c',
            },
            '&:disabled': {
              bgcolor: '#fca5a5',
              color: 'white',
            },
          }}
        >
          {isLoading ? 'Deleting...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
