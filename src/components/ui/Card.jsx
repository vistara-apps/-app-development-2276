import React from 'react';
import clsx from 'clsx';

/**
 * Card component for containing content
 * 
 * @param {Object} props - Component props
 * @param {'default'|'compact'|'flat'} [props.variant='default'] - Card style variant
 * @param {boolean} [props.interactive=false] - Add hover effects for interactive cards
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.HTMLAttributes} props.rest - Any other HTML attributes
 */
const Card = ({
  variant = 'default',
  interactive = false,
  children,
  className,
  ...rest
}) => {
  // Base classes for all cards
  const baseClasses = 'bg-surface rounded-lg border border-gray-200 transition-all duration-normal';
  
  // Variant classes
  const variantClasses = {
    default: 'p-6 shadow-card',
    compact: 'p-4 shadow-card',
    flat: 'p-6 shadow-none',
  };
  
  // Interactive classes
  const interactiveClasses = interactive 
    ? 'cursor-pointer hover:shadow-cardHover hover:border-accent' 
    : '';
  
  return (
    <div
      className={clsx(
        baseClasses,
        variantClasses[variant],
        interactiveClasses,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * Card.Header component for card headers
 */
Card.Header = ({ children, className, ...rest }) => (
  <div 
    className={clsx('mb-4', className)} 
    {...rest}
  >
    {children}
  </div>
);

/**
 * Card.Title component for card titles
 */
Card.Title = ({ children, className, ...rest }) => (
  <h3 
    className={clsx('text-lg font-semibold text-textPrimary', className)} 
    {...rest}
  >
    {children}
  </h3>
);

/**
 * Card.Description component for card descriptions
 */
Card.Description = ({ children, className, ...rest }) => (
  <p 
    className={clsx('text-sm text-textSecondary mt-1', className)} 
    {...rest}
  >
    {children}
  </p>
);

/**
 * Card.Content component for card content
 */
Card.Content = ({ children, className, ...rest }) => (
  <div 
    className={clsx('', className)} 
    {...rest}
  >
    {children}
  </div>
);

/**
 * Card.Footer component for card footers
 */
Card.Footer = ({ children, className, ...rest }) => (
  <div 
    className={clsx('mt-4 pt-4 border-t border-gray-200 flex justify-between items-center', className)} 
    {...rest}
  >
    {children}
  </div>
);

export default Card;

