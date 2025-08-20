import React from 'react'
import { Activity, Brain, Clock, DollarSign, TrendingUp, Zap } from 'lucide-react'
import AIModelCard from '../components/AIModelCard'
import AnalyticsChart from '../components/AnalyticsChart'
import useAppStore from '../store/useAppStore'

export default function Dashboard() {
  const { integrations, analyticsData } = useAppStore()

  const stats = [
    {
      name: 'Total Models',
      value: integrations.length,
      icon: Brain,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      name: 'Active Models',
      value: integrations.filter(i => i.status === 'active').length,
      icon: Zap,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      name: 'Total Requests',
      value: integrations.reduce((sum, i) => sum + (i.requests || 0), 0),
      icon: Activity,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      name: 'Total Cost',
      value: `$${integrations.reduce((sum, i) => sum + (i.cost || 0), 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-textPrimary">Dashboard</h1>
        <p className="mt-2 text-textSecondary">
          Monitor your AI models and track performance metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-surface p-6 rounded-lg shadow-card">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-textSecondary">{stat.name}</p>
                  <p className="text-2xl font-semibold text-textPrimary">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          variant="line"
          data={analyticsData.usage}
          config={{
            xKey: 'date',
            yKey: 'requests',
            title: 'Request Volume',
            height: 300
          }}
        />
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
      </div>

      {/* Active Models */}
      <div>
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Active Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations
            .filter(integration => integration.status === 'active')
            .map((integration) => (
              <AIModelCard key={integration.id} model={integration} />
            ))}
          {integrations.filter(i => i.status === 'active').length === 0 && (
            <div className="col-span-full bg-surface p-8 rounded-lg shadow-card text-center">
              <Brain className="w-12 h-12 text-textSecondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-textPrimary mb-2">No Active Models</h3>
              <p className="text-textSecondary">
                Add your first AI model integration to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}