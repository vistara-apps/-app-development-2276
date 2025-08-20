import React from 'react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'

/**
 * Color palette for charts
 */
const COLORS = {
  primary: '#4F46E5', // primary
  success: '#10B981', // success
  warning: '#F59E0B', // warning
  error: '#EF4444',   // error
  purple: '#8B5CF6',  // purple
  cyan: '#06B6D4',    // cyan
  pink: '#EC4899',    // pink
  indigo: '#6366F1'   // indigo
}

// Color array for pie/bar charts
const COLOR_ARRAY = Object.values(COLORS)

/**
 * Custom tooltip component for charts
 */
const CustomTooltip = ({ active, payload, label, valuePrefix, valueSuffix }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="bg-surface p-3 border border-gray-200 shadow-lg rounded-md">
      <p className="text-sm font-medium text-textPrimary mb-1">{label}</p>
      {payload.map((entry, index) => (
        <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
          <span className="font-medium">
            {entry.name}: {valuePrefix || ''}{entry.value.toLocaleString()}{valueSuffix || ''}
          </span>
        </p>
      ))}
    </div>
  );
};

/**
 * AnalyticsChart component for data visualization
 * 
 * @param {Object} props - Component props
 * @param {'line'|'bar'|'pie'} [props.variant='line'] - Chart type
 * @param {Array} props.data - Chart data array
 * @param {Object} props.config - Chart configuration
 * @param {string} props.config.xKey - Data key for X axis
 * @param {string|Array} props.config.yKey - Data key(s) for Y axis
 * @param {string} [props.config.title] - Chart title
 * @param {number} [props.config.height=300] - Chart height
 * @param {string} [props.config.valuePrefix] - Prefix for values (e.g., '$')
 * @param {string} [props.config.valueSuffix] - Suffix for values (e.g., '%')
 * @param {boolean} [props.config.showLegend=false] - Whether to show legend
 */
export default function AnalyticsChart({ variant = 'line', data, config }) {
  const { 
    xKey, 
    yKey, 
    title, 
    height = 300,
    valuePrefix,
    valueSuffix,
    showLegend = false
  } = config

  // Format numbers with commas
  const formatNumber = (value) => value.toLocaleString();

  const renderChart = () => {
    switch (variant) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey={xKey} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
              tickFormatter={formatNumber}
            />
            <Tooltip 
              content={<CustomTooltip valuePrefix={valuePrefix} valueSuffix={valueSuffix} />}
            />
            {showLegend && <Legend />}
            {Array.isArray(yKey) ? (
              yKey.map((key, index) => (
                <Bar 
                  key={key}
                  dataKey={key} 
                  fill={COLOR_ARRAY[index % COLOR_ARRAY.length]} 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              ))
            ) : (
              <Bar 
                dataKey={yKey} 
                fill={COLORS.primary} 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            )}
          </BarChart>
        )
      
      case 'pie':
        return (
          <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              innerRadius={showLegend ? 40 : 0} // Make it a donut chart if legend is shown
              fill={COLORS.primary}
              dataKey={yKey}
              animationDuration={1000}
              animationBegin={200}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLOR_ARRAY[index % COLOR_ARRAY.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip valuePrefix={valuePrefix} valueSuffix={valueSuffix} />}
            />
            {showLegend && <Legend />}
          </PieChart>
        )
      
      default: // line
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey={xKey} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
              tickFormatter={formatNumber}
            />
            <Tooltip 
              content={<CustomTooltip valuePrefix={valuePrefix} valueSuffix={valueSuffix} />}
            />
            {showLegend && <Legend />}
            {Array.isArray(yKey) ? (
              yKey.map((key, index) => (
                <Line 
                  key={key}
                  type="monotone" 
                  dataKey={key} 
                  stroke={COLOR_ARRAY[index % COLOR_ARRAY.length]} 
                  strokeWidth={2}
                  dot={{ fill: COLOR_ARRAY[index % COLOR_ARRAY.length], r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1000}
                />
              ))
            ) : (
              <Line 
                type="monotone" 
                dataKey={yKey} 
                stroke={COLORS.primary} 
                strokeWidth={2}
                dot={{ fill: COLORS.primary, r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1000}
              />
            )}
          </LineChart>
        )
    }
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}
