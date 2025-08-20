import React from 'react'
import { Activity, Clock, DollarSign, Zap, Settings } from 'lucide-react'
import clsx from 'clsx'
import { Card, Badge } from './ui'

/**
 * AIModelCard component for displaying AI model information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.model - Model data object
 * @param {'default'|'compact'} [props.variant='default'] - Card style variant
 * @param {Function} [props.onClick] - Click handler for the card
 * @param {string} [props.className] - Additional CSS classes
 */
export default function AIModelCard({ model, variant = 'default', onClick, className }) {
  const isCompact = variant === 'compact'
  
  // Determine badge variant based on status
  const badgeVariant = model.status === 'active' ? 'success' : 'neutral'
  
  return (
    <Card
      variant={isCompact ? 'compact' : 'default'}
      interactive={!!onClick}
      onClick={onClick}
      className={className}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={clsx(
            'rounded-lg flex items-center justify-center',
            isCompact ? 'w-8 h-8' : 'w-12 h-12',
            model.status === 'active' ? 'bg-successLight' : 'bg-gray-100'
          )}>
            <Zap className={clsx(
              model.status === 'active' ? 'text-success' : 'text-gray-400',
              isCompact ? 'w-4 h-4' : 'w-6 h-6'
            )} 
            aria-hidden="true" 
            />
          </div>
          <div className="ml-3">
            <h3 className={clsx(
              'font-semibold text-textPrimary',
              isCompact ? 'text-sm' : 'text-lg'
            )}>
              {model.name}
            </h3>
            <p className={clsx(
              'text-textSecondary',
              isCompact ? 'text-xs' : 'text-sm'
            )}>
              {model.provider}
            </p>
          </div>
        </div>
        <Badge variant={badgeVariant}>
          {model.status}
        </Badge>
      </div>

      {!isCompact && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Activity className="w-4 h-4 text-textSecondary" aria-hidden="true" />
            </div>
            <div className="text-sm font-medium text-textPrimary">{model.requests?.toLocaleString() || 0}</div>
            <div className="text-xs text-textSecondary">Requests</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-textSecondary" aria-hidden="true" />
            </div>
            <div className="text-sm font-medium text-textPrimary">{model.avgTime || '0ms'}</div>
            <div className="text-xs text-textSecondary">Avg Time</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4 text-textSecondary" aria-hidden="true" />
            </div>
            <div className="text-sm font-medium text-textPrimary">${model.cost?.toFixed(2) || '0.00'}</div>
            <div className="text-xs text-textSecondary">Cost</div>
          </div>
        </div>
      )}
      
      {onClick && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
          <button 
            className="flex items-center text-xs text-textSecondary hover:text-primary transition-colors"
            aria-label="Configure model"
          >
            <Settings className="w-3 h-3 mr-1" aria-hidden="true" />
            Configure
          </button>
        </div>
      )}
    </Card>
  )
}
