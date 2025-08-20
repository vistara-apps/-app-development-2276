import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

/**
 * StatCard component for displaying metrics with optional trend indicators
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Stat title/label
 * @param {string|number} props.value - Main stat value
 * @param {React.ElementType} props.icon - Icon component
 * @param {string} [props.iconColor='text-blue-600'] - Icon color class
 * @param {string} [props.iconBg='bg-blue-100'] - Icon background color class
 * @param {number} [props.trend] - Trend percentage (positive or negative)
 * @param {string} [props.trendLabel] - Label for trend (e.g., "vs last month")
 * @param {string} [props.className] - Additional CSS classes
 */
const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-100',
  trend,
  trendLabel,
  className,
  ...rest
}) => {
  const hasTrend = trend !== undefined;
  const isTrendPositive = hasTrend && trend >= 0;
  
  return (
    <div 
      className={clsx(
        'bg-surface p-6 rounded-lg shadow-card transition-all duration-normal hover:shadow-cardHover',
        className
      )}
      {...rest}
    >
      <div className="flex items-center">
        <div className={clsx('p-2 rounded-lg', iconBg)}>
          <Icon className={clsx('w-6 h-6', iconColor)} aria-hidden="true" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-textSecondary">{title}</p>
          <p className="text-2xl font-semibold text-textPrimary">{value}</p>
          
          {hasTrend && (
            <div className="flex items-center mt-1">
              <span
                className={clsx(
                  'flex items-center text-xs font-medium',
                  isTrendPositive ? 'text-success' : 'text-error'
                )}
              >
                {isTrendPositive ? (
                  <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" aria-hidden="true" />
                )}
                {Math.abs(trend)}%
              </span>
              
              {trendLabel && (
                <span className="text-xs text-textTertiary ml-1">
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

