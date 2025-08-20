import React, { useState } from 'react'
import { Calendar, TrendingUp, DollarSign, Activity } from 'lucide-react'
import AnalyticsChart from '../components/AnalyticsChart'
import useAppStore from '../store/useAppStore'

export default function Analytics() {
  const { analyticsData, integrations } = useAppStore()
  const [timeRange, setTimeRange] = useState('7d')

  const totalCost = integrations.reduce((sum, i) => sum + (i.cost || 0), 0)
  const totalRequests = integrations.reduce((sum, i) => sum + (i.requests || 0), 0)
  const activeModels = integrations.filter(i => i.status === 'active').length

  const costData = analyticsData.usage.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    cost: item.cost
  }))

  const requestData = analyticsData.usage.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    requests: item.requests
  }))

  const modelPerformanceData = integrations.map(model => ({
    name: model.name,
    avgResponseTime: parseFloat(model.avgTime?.replace('s', '').replace('ms', '')) || 0,
    requests: model.requests || 0,
    cost: model.cost || 0
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-textPrimary">Usage Analytics</h1>
          <p className="mt-2 text-textSecondary">
            Track AI model usage, costs, and performance insights.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-textSecondary" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-textSecondary">Total Requests</p>
              <p className="text-2xl font-semibold text-textPrimary">{totalRequests.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-textSecondary">Total Cost</p>
              <p className="text-2xl font-semibold text-textPrimary">${totalCost.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-textSecondary">Active Models</p>
              <p className="text-2xl font-semibold text-textPrimary">{activeModels}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-textSecondary">Avg Cost/Request</p>
              <p className="text-2xl font-semibold text-textPrimary">
                ${totalRequests > 0 ? (totalCost / totalRequests).toFixed(3) : '0.000'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          variant="line"
          data={requestData}
          config={{
            xKey: 'date',
            yKey: 'requests',
            title: 'Request Volume Over Time',
            height: 300
          }}
        />
        <AnalyticsChart
          variant="line"
          data={costData}
          config={{
            xKey: 'date',
            yKey: 'cost',
            title: 'Cost Trend Over Time',
            height: 300
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          variant="pie"
          data={analyticsData.modelDistribution}
          config={{
            xKey: 'name',
            yKey: 'value',
            title: 'Model Usage Distribution',
            height: 300
          }}
        />
        <AnalyticsChart
          variant="bar"
          data={modelPerformanceData}
          config={{
            xKey: 'name',
            yKey: 'cost',
            title: 'Cost by Model',
            height: 300
          }}
        />
      </div>

      {/* Detailed Usage Table */}
      <div className="bg-surface rounded-lg shadow-card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-textPrimary">Model Performance Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Requests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Avg Response Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {integrations.map((model) => (
                <tr key={model.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-textPrimary">
                    {model.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                    {model.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {model.requests?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {model.avgTime || '0ms'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    ${(model.cost || 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      model.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {model.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}