import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';
import { cn } from '@/lib/utils';

interface ChipProps extends MuiChipProps {
  status?: 'success' | 'error' | 'warning' | 'info' | 'default';
}

export default function Chip({
  status = 'default',
  className,
  ...props
}: ChipProps) {
  const statusColors = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-cyan-100 text-cyan-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return <MuiChip className={cn(statusColors[status], className)} {...props} />;
}
