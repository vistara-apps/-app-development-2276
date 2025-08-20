import React from 'react'
import { Activity, Brain, Clock, DollarSign, TrendingUp, Zap, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import AIModelCard from '../components/AIModelCard'
import AnalyticsChart from '../components/AnalyticsChart'
import StatCard from '../components/StatCard'
import { Card, Button, Badge } from '../components/ui'
import useAppStore from '../store/useAppStore'

export default function Dashboard() {
  const { integrations, analyticsData } = useAppStore()

  // Calculate trends (mock data for demonstration)
  const weeklyTrends = {
    models: 10, // 10% increase in models
    requests: 15, // 15% increase in requests
    cost: -5 // 5% decrease in cost
  }

  const stats = [
    {
      name: 'Total Models',
      value: integrations.length,
      icon: Brain,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      trend: weeklyTrends.models,
      trendLabel: 'vs last week'
    },
    {
      name: 'Active Models',
      value: integrations.filter(i => i.status === 'active').length,
      icon: Zap,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      name: 'Total Requests',
      value: integrations.reduce((sum, i) => sum + (i.requests || 0), 0),
      icon: Activity,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      trend: weeklyTrends.requests,
      trendLabel: 'vs last week'
    },
    {
      name: 'Total Cost',
      value: `$${integrations.reduce((sum, i) => sum + (i.cost || 0), 0).toFixed(2)}`,
      icon: DollarSign,
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      trend: weeklyTrends.cost,
      trendLabel: 'vs last week'
    }
  ]

  // Quick actions for the dashboard
  const quickActions = [
    { name: 'Add Integration', href: '/integrations', icon: Plus, description: 'Connect a new AI model' },
    { name: 'Run Benchmark', href: '/benchmarks', icon: Zap, description: 'Compare model performance' },
    { name: 'Create Workflow', href: '/workflows', icon: Activity, description: 'Build an AI workflow' }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-textPrimary">Dashboard</h1>
          <p className="mt-2 text-textSecondary">
            Monitor your AI models and track performance metrics.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button 
            variant="primary" 
            size="md"
            as={Link}
            to="/integrations"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBg={stat.iconBg}
            trend={stat.trend}
            trendLabel={stat.trendLabel}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <Card variant="flat" className="bg-primaryLight border-primary/20">
        <Card.Header>
          <Card.Title>Quick Actions</Card.Title>
          <Card.Description>Common tasks to help you get started</Card.Description>
        </Card.Header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-subtle hover:shadow-card transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-primaryLight">
                <action.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-textPrimary">{action.name}</h3>
                <p className="text-xs text-textSecondary mt-0.5">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Request Volume</Card.Title>
            <Card.Description>API requests over time</Card.Description>
          </Card.Header>
          <div className="h-[300px]">
            <AnalyticsChart
              variant="line"
              data={analyticsData.usage}
              config={{
                xKey: 'date',
                yKey: 'requests',
                height: 280
              }}
            />
          </div>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Model Usage Distribution</Card.Title>
            <Card.Description>Requests by model</Card.Description>
          </Card.Header>
          <div className="h-[300px]">
            <AnalyticsChart
              variant="pie"
              data={analyticsData.modelDistribution}
              config={{
                xKey: 'name',
                yKey: 'value',
                height: 280
              }}
            />
          </div>
        </Card>
      </div>

      {/* Active Models */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-textPrimary">Active Models</h2>
          <Link 
            to="/integrations" 
            className="text-sm text-primary hover:text-primaryDark transition-colors"
          >
            View all models
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations
            .filter(integration => integration.status === 'active')
            .map((integration) => (
              <AIModelCard 
                key={integration.id} 
                model={integration} 
                onClick={() => {}} // Add click handler for model details
              />
            ))}
          {integrations.filter(i => i.status === 'active').length === 0 && (
            <Card className="col-span-full p-8 text-center">
              <Brain className="w-12 h-12 text-textSecondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-textPrimary mb-2">No Active Models</h3>
              <p className="text-textSecondary mb-4">
                Add your first AI model integration to get started.
              </p>
              <Button 
                variant="primary"
                as={Link}
                to="/integrations"
              >
                Add Integration
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
