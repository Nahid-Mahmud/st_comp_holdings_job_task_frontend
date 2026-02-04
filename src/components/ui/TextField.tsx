import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';

interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
}

export default function TextField({ className, ...props }: TextFieldProps) {
  return <MuiTextField className={className} variant="outlined" {...props} />;
}
