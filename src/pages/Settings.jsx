import React, { useState } from 'react'
import { User, Key, Bell, CreditCard, Save } from 'lucide-react'
import AlertMessage from '../components/AlertMessage'

export default function Settings() {
  const [alert, setAlert] = useState(null)
  const [settings, setSettings] = useState({
    profile: {
      email: 'user@example.com',
      name: 'John Doe',
      plan: 'Pro'
    },
    notifications: {
      email: true,
      benchmarkComplete: true,
      costAlerts: true,
      weeklyReport: false
    },
    apiLimits: {
      dailyRequestLimit: 1000,
      monthlyBudget: 100
    }
  })

  const handleSave = (section) => {
    setAlert({ variant: 'success', message: `${section} settings saved successfully!` })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-textPrimary">Settings</h1>
        <p className="mt-2 text-textSecondary">
          Manage your account preferences and configurations.
        </p>
      </div>

      {/* Alert */}
      {alert && (
        <AlertMessage
          variant={alert.variant}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Profile Settings */}
      <div className="bg-surface p-6 rounded-lg shadow-card">
        <div className="flex items-center mb-6">
          <User className="w-5 h-5 text-textSecondary mr-2" />
          <h2 className="text-xl font-semibold text-textPrimary">Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={settings.profile.name}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                profile: { ...prev.profile, name: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                profile: { ...prev.profile, email: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h3 className="font-medium text-textPrimary">Current Plan: {settings.profile.plan}</h3>
              <p className="text-sm text-textSecondary">Access to all AI models and advanced features</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors">
              Manage Plan
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave('Profile')}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-surface p-6 rounded-lg shadow-card">
        <div className="flex items-center mb-6">
          <Bell className="w-5 h-5 text-textSecondary mr-2" />
          <h2 className="text-xl font-semibold text-textPrimary">Notifications</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-textPrimary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-sm text-textSecondary">
                  {key === 'email' && 'Receive notifications via email'}
                  {key === 'benchmarkComplete' && 'Get notified when benchmarks finish'}
                  {key === 'costAlerts' && 'Alerts when spending limits are reached'}
                  {key === 'weeklyReport' && 'Weekly usage and performance summary'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, [key]: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave('Notification')}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Notifications
          </button>
        </div>
      </div>

      {/* API & Usage Limits */}
      <div className="bg-surface p-6 rounded-lg shadow-card">
        <div className="flex items-center mb-6">
          <Key className="w-5 h-5 text-textSecondary mr-2" />
          <h2 className="text-xl font-semibold text-textPrimary">API & Usage Limits</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Daily Request Limit
            </label>
            <input
              type="number"
              value={settings.apiLimits.dailyRequestLimit}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                apiLimits: { ...prev.apiLimits, dailyRequestLimit: parseInt(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <p className="text-sm text-textSecondary mt-1">
              Maximum API requests per day across all models
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Monthly Budget ($)
            </label>
            <input
              type="number"
              value={settings.apiLimits.monthlyBudget}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                apiLimits: { ...prev.apiLimits, monthlyBudget: parseFloat(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <p className="text-sm text-textSecondary mt-1">
              Alert when monthly spending approaches this limit
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave('API Limits')}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Limits
          </button>
        </div>
      </div>

      {/* Billing */}
      <div className="bg-surface p-6 rounded-lg shadow-card">
        <div className="flex items-center mb-6">
          <CreditCard className="w-5 h-5 text-textSecondary mr-2" />
          <h2 className="text-xl font-semibold text-textPrimary">Billing & Subscription</h2>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-textPrimary">Current Plan: Pro</h3>
              <p className="text-sm text-textSecondary">$29/month • Next billing: January 15, 2024</p>
            </div>
            <div className="space-x-2">
              <button className="px-3 py-1 text-sm text-textSecondary border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Change Plan
              </button>
              <button className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-textPrimary">Payment Method</h3>
              <p className="text-sm text-textSecondary">•••• •••• •••• 4242 (Visa)</p>
            </div>
            <button className="px-3 py-1 text-sm text-accent border border-accent rounded-md hover:bg-blue-50 transition-colors">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}