import { InputHTMLAttributes, forwardRef } from 'react';
import Input from '@/components/ui/Input';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, ...props }, ref) => {
    return <Input ref={ref} label={label} error={error} {...props} />;
  }
);

FormField.displayName = 'FormField';

export default FormField;
