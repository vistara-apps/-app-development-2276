import React, { useState } from 'react'
import { Eye, EyeOff, Key, Save } from 'lucide-react'
import clsx from 'clsx'

export default function ApiKeyInput({ 
  provider, 
  value, 
  onChange, 
  onSave, 
  placeholder = "Enter API key...",
  variant = 'default' 
}) {
  const [showKey, setShowKey] = useState(false)
  const [localValue, setLocalValue] = useState(value || '')

  const handleSave = () => {
    if (onSave) {
      onSave(localValue)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <Key className="w-4 h-4 text-textSecondary mr-2" />
        <label className="text-sm font-medium text-textPrimary">
          {provider} API Key
        </label>
      </div>
      
      <div className="relative">
        <input
          type={showKey ? 'text' : 'password'}
          value={localValue}
          onChange={(e) => {
            setLocalValue(e.target.value)
            if (onChange) onChange(e.target.value)
          }}
          placeholder={placeholder}
          className={clsx(
            'w-full px-3 py-2 pr-20 border border-gray-300 rounded-md',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            'text-sm text-textPrimary placeholder-textSecondary'
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="px-2 text-textSecondary hover:text-textPrimary"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!localValue.trim()}
            className={clsx(
              'px-2 mr-1 text-textSecondary hover:text-accent',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {localValue && (
        <div className="text-xs text-textSecondary">
          Key ending in: ***{localValue.slice(-4)}
        </div>
      )}
    </div>
  )
}