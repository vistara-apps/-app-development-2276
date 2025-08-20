import React from 'react';
import clsx from 'clsx';

/**
 * Button component with multiple variants
 * 
 * @param {Object} props - Component props
 * @param {'primary'|'secondary'|'accent'|'danger'|'ghost'} [props.variant='primary'] - Button style variant
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Button size
 * @param {boolean} [props.isLoading=false] - Show loading spinner
 * @param {boolean} [props.isFullWidth=false] - Make button full width
 * @param {boolean} [props.disabled=false] - Disable button
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ButtonHTMLAttributes} props.rest - Any other button props
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  disabled = false,
  children,
  className,
  ...rest
}) => {
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primaryDark focus:ring-primary',
    secondary: 'bg-white text-textPrimary border border-gray-300 hover:bg-gray-50 focus:ring-gray-300',
    accent: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent',
    danger: 'bg-error text-white hover:bg-error/90 focus:ring-error',
    ghost: 'bg-transparent text-textPrimary hover:bg-gray-100 focus:ring-gray-300',
  };
  
  // Width class
  const widthClass = isFullWidth ? 'w-full' : '';
  
  return (
    <button
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        widthClass,
        className
      )}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;

