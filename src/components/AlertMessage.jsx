import React from 'react'
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react'
import clsx from 'clsx'

const variants = {
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    iconColor: 'text-green-600'
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    iconColor: 'text-red-600'
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    iconColor: 'text-yellow-600'
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    iconColor: 'text-blue-600'
  }
}

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
    <div className={clsx(
      'p-4 border rounded-md',
      config.bg,
      config.border,
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={clsx('w-5 h-5', config.iconColor)} />
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
                'inline-flex rounded-md p-1.5 hover:bg-gray-100',
                config.text
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}