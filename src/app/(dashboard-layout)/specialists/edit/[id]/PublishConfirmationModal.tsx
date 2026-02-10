import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Error } from '@mui/icons-material';

interface PublishConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function PublishConfirmationModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: PublishConfirmationModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ fontWeight: 600, fontFamily: 'var(--font-red-hat-display)' }}
      >
        <Error /> Publish changes
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to publish these changes? It will appear in the
          marketplace listing
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          disabled={isLoading}
          onClick={onClose}
          variant="outlined"
          sx={{ minWidth: '120px' }}
        >
          Continue Editing
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isLoading}
          sx={{ minWidth: '120px' }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            'Save changes'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
