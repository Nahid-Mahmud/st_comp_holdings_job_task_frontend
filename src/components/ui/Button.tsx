import { ButtonProps as MuiButtonProps } from '@mui/material';
import MuiButton from '@mui/material/Button';

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <MuiButton className={className} {...props}>
      {children}
    </MuiButton>
  );
}
