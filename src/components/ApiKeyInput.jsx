import React, { useState, useId } from 'react'
import { Eye, EyeOff, Key, Save, Check, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import { FormField } from './ui'

/**
 * ApiKeyInput component for securely entering API keys
 * 
 * @param {Object} props - Component props
 * @param {string} props.provider - API provider name
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onSave - Save handler
 * @param {string} [props.placeholder="Enter API key..."] - Input placeholder
 * @param {'default'|'compact'} [props.variant='default'] - Input style variant
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {boolean} [props.isSuccess=false] - Success state
 * @param {string} [props.errorMessage] - Error message
 * @param {string} [props.helperText] - Helper text
 * @param {string} [props.className] - Additional CSS classes
 */
export default function ApiKeyInput({ 
  provider, 
  value, 
  onChange, 
  onSave, 
  placeholder = "Enter API key...",
  variant = 'default',
  isLoading = false,
  isSuccess = false,
  errorMessage,
  helperText,
  className
}) {
  const [showKey, setShowKey] = useState(false)
  const [localValue, setLocalValue] = useState(value || '')
  const [saveSuccess, setSaveSuccess] = useState(false)
  const id = useId()
  
  const isCompact = variant === 'compact'
  const hasError = !!errorMessage
  const showSuccess = isSuccess || saveSuccess

  const handleSave = () => {
    if (onSave && localValue.trim()) {
      onSave(localValue)
      setSaveSuccess(true)
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 2000)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && localValue.trim()) {
      handleSave()
    }
  }

  return (
    <div className={clsx("space-y-3", className)}>
      <div className="flex items-center">
        <Key className="w-4 h-4 text-textSecondary mr-2" aria-hidden="true" />
        <label 
          htmlFor={`api-key-${id}`} 
          className="text-sm font-medium text-textPrimary"
        >
          {provider} API Key
        </label>
      </div>
      
      <div className="relative">
        <input
          id={`api-key-${id}`}
          type={showKey ? 'text' : 'password'}
          value={localValue}
          onChange={(e) => {
            setLocalValue(e.target.value)
            if (onChange) onChange(e.target.value)
            // Reset success state when input changes
            setSaveSuccess(false)
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `api-key-error-${id}` : (helperText ? `api-key-helper-${id}` : undefined)}
          className={clsx(
            'w-full px-3 py-2 pr-20 border rounded-md transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'text-sm text-textPrimary placeholder-textSecondary',
            hasError 
              ? 'border-error focus:ring-error/30' 
              : 'border-gray-300 focus:ring-accent/30'
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="px-2 text-textSecondary hover:text-textPrimary transition-colors"
            aria-label={showKey ? "Hide API key" : "Show API key"}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!localValue.trim() || isLoading}
            aria-label="Save API key"
            className={clsx(
              'px-2 mr-1 rounded-md transition-colors',
              !localValue.trim() || isLoading
                ? 'text-textTertiary cursor-not-allowed'
                : showSuccess
                  ? 'text-success hover:text-success/80'
                  : 'text-textSecondary hover:text-accent'
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : showSuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      
      {/* Error or helper text */}
      {hasError ? (
        <p id={`api-key-error-${id}`} className="text-xs text-error">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`api-key-helper-${id}`} className="text-xs text-textSecondary">
          {helperText}
        </p>
      ) : localValue ? (
        <div className="text-xs text-textSecondary">
          Key ending in: <span className="font-mono">***{localValue.slice(-4)}</span>
        </div>
      ) : null}
    </div>
  )
}
