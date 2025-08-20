import React from 'react';
import clsx from 'clsx';

/**
 * FormField component for form inputs with label and helper text
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Input ID (required for accessibility)
 * @param {string} [props.label] - Input label
 * @param {string} [props.helperText] - Helper text below the input
 * @param {string} [props.errorText] - Error message (displays instead of helper text)
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {React.ReactNode} props.children - Input element
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.HTMLAttributes} props.rest - Any other HTML attributes
 */
const FormField = ({
  id,
  label,
  helperText,
  errorText,
  required = false,
  children,
  className,
  ...rest
}) => {
  const hasError = !!errorText;
  
  return (
    <div className={clsx('space-y-1', className)} {...rest}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-textPrimary"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      {React.cloneElement(children, { 
        id, 
        'aria-invalid': hasError,
        'aria-describedby': helperText || errorText ? `${id}-description` : undefined,
        className: clsx(
          children.props.className,
          hasError && 'border-error focus:ring-error focus:border-error'
        )
      })}
      
      {(helperText || errorText) && (
        <p 
          id={`${id}-description`}
          className={clsx(
            'text-sm',
            hasError ? 'text-error' : 'text-textSecondary'
          )}
        >
          {hasError ? errorText : helperText}
        </p>
      )}
    </div>
  );
};

export default FormField;

