import React from 'react'
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react'
import clsx from 'clsx'

/**
 * Alert message variants configuration
 */
const variants = {
  success: {
    icon: CheckCircle,
    bg: 'bg-successLight',
    border: 'border-success/20',
    text: 'text-success',
    iconColor: 'text-success',
    role: 'status'
  },
  error: {
    icon: XCircle,
    bg: 'bg-errorLight',
    border: 'border-error/20',
    text: 'text-error',
    iconColor: 'text-error',
    role: 'alert'
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-warningLight',
    border: 'border-warning/20',
    text: 'text-warning',
    iconColor: 'text-warning',
    role: 'alert'
  },
  info: {
    icon: Info,
    bg: 'bg-infoLight',
    border: 'border-info/20',
    text: 'text-info',
    iconColor: 'text-info',
    role: 'status'
  }
}

/**
 * AlertMessage component for displaying notifications and alerts
 * 
 * @param {Object} props - Component props
 * @param {'success'|'error'|'warning'|'info'} [props.variant='info'] - Alert style variant
 * @param {string} [props.title] - Alert title
 * @param {string} [props.message] - Alert message
 * @param {Function} [props.onClose] - Close handler function
 * @param {string} [props.className] - Additional CSS classes
 */
export default function AlertMessage({ 
  variant = 'info', 
  title, 
  message, 
  onClose,
  className 
}) {
  const config = variants[variant]
  const Icon = config.icon

  return (
    <div 
      className={clsx(
        'p-4 border rounded-md shadow-subtle animate-fade-in',
        config.bg,
        config.border,
        className
      )}
      role={config.role}
      aria-live={variant === 'error' || variant === 'warning' ? 'assertive' : 'polite'}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={clsx('w-5 h-5', config.iconColor)} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={clsx('text-sm font-medium', config.text)}>
              {title}
            </h3>
          )}
          {message && (
            <div className={clsx('text-sm', title ? 'mt-1' : '', config.text)}>
              {message}
            </div>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={clsx(
                'inline-flex rounded-md p-1.5 hover:bg-white/30 transition-colors',
                config.text
              )}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
