import React from 'react'
import { Activity, Clock, DollarSign, Zap } from 'lucide-react'
import clsx from 'clsx'

export default function AIModelCard({ model, variant = 'default', onClick }) {
  const isCompact = variant === 'compact'
  
  return (
    <div 
      className={clsx(
        'bg-surface rounded-lg shadow-card border border-gray-200 transition-all duration-200 hover:shadow-lg',
        onClick && 'cursor-pointer hover:border-accent',
        isCompact ? 'p-4' : 'p-6'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={clsx(
            'rounded-lg flex items-center justify-center',
            isCompact ? 'w-8 h-8' : 'w-12 h-12',
            model.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
          )}>
            <Zap className={clsx(
              model.status === 'active' ? 'text-green-600' : 'text-gray-400',
              isCompact ? 'w-4 h-4' : 'w-6 h-6'
            )} />
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
        <div className={clsx(
          'px-2 py-1 rounded-full text-xs font-medium',
          model.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        )}>
          {model.status}
        </div>
      </div>

      {!isCompact && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Activity className="w-4 h-4 text-textSecondary" />
            </div>
            <div className="text-sm font-medium text-textPrimary">{model.requests || 0}</div>
            <div className="text-xs text-textSecondary">Requests</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-textSecondary" />
            </div>
            <div className="text-sm font-medium text-textPrimary">{model.avgTime || '0ms'}</div>
            <div className="text-xs text-textSecondary">Avg Time</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4 text-textSecondary" />
            </div>
            <div className="text-sm font-medium text-textPrimary">${model.cost || '0.00'}</div>
            <div className="text-xs text-textSecondary">Cost</div>
          </div>
        </div>
      )}
    </div>
  )
}