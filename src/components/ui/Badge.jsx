import React from 'react';
import clsx from 'clsx';

/**
 * Badge component for status indicators
 * 
 * @param {Object} props - Component props
 * @param {'success'|'error'|'warning'|'info'|'neutral'} [props.variant='neutral'] - Badge style variant
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.HTMLAttributes} props.rest - Any other HTML attributes
 */
const Badge = ({
  variant = 'neutral',
  children,
  className,
  ...rest
}) => {
  // Base classes for all badges
  const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';
  
  // Variant classes
  const variantClasses = {
    success: 'bg-successLight text-success',
    error: 'bg-errorLight text-error',
    warning: 'bg-warningLight text-warning',
    info: 'bg-infoLight text-info',
    neutral: 'bg-gray-100 text-textSecondary',
  };
  
  return (
    <span
      className={clsx(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;

