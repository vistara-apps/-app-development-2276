import React, { useState } from 'react'
import { Plus, Settings, Trash2 } from 'lucide-react'
import AIModelCard from '../components/AIModelCard'
import ApiKeyInput from '../components/ApiKeyInput'
import AlertMessage from '../components/AlertMessage'
import useAppStore from '../store/useAppStore'

const availableModels = [
  { name: 'GPT-4', provider: 'OpenAI', description: 'Most capable OpenAI model' },
  { name: 'GPT-3.5 Turbo', provider: 'OpenAI', description: 'Fast and efficient' },
  { name: 'Claude-3 Opus', provider: 'Anthropic', description: 'Anthropic\'s most powerful model' },
  { name: 'Claude-3 Sonnet', provider: 'Anthropic', description: 'Balanced performance and speed' },
]

export default function Integrations() {
  const { integrations, addIntegration, updateIntegration, removeIntegration } = useAppStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedModel, setSelectedModel] = useState(null)
  const [apiKey, setApiKey] = useState('')
  const [alert, setAlert] = useState(null)

  const handleAddIntegration = (model) => {
    if (!apiKey.trim()) {
      setAlert({ variant: 'error', message: 'Please enter an API key' })
      return
    }

    const newIntegration = {
      name: model.name,
      provider: model.provider,
      status: 'active',
      apiKey: apiKey,
      requests: 0,
      avgTime: '0ms',
      cost: 0,
      lastUsed: new Date().toISOString()
    }

    addIntegration(newIntegration)
    setShowAddForm(false)
    setSelectedModel(null)
    setApiKey('')
    setAlert({ variant: 'success', message: 'Integration added successfully!' })
  }

  const handleUpdateApiKey = (integrationId, newApiKey) => {
    updateIntegration(integrationId, { apiKey: newApiKey })
    setAlert({ variant: 'success', message: 'API key updated successfully!' })
  }

  const handleRemoveIntegration = (integrationId) => {
    removeIntegration(integrationId)
    setAlert({ variant: 'success', message: 'Integration removed successfully!' })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-textPrimary">AI Model Integrations</h1>
          <p className="mt-2 text-textSecondary">
            Connect and manage your AI model integrations.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </button>
      </div>

      {/* Alert */}
      {alert && (
        <AlertMessage
          variant={alert.variant}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Add Integration Form */}
      {showAddForm && (
        <div className="bg-surface p-6 rounded-lg shadow-card border border-gray-200">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Add New Integration</h3>
          
          {!selectedModel ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableModels.map((model) => (
                <div
                  key={`${model.provider}-${model.name}`}
                  onClick={() => setSelectedModel(model)}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-accent transition-colors"
                >
                  <h4 className="font-medium text-textPrimary">{model.name}</h4>
                  <p className="text-sm text-textSecondary mt-1">{model.provider}</p>
                  <p className="text-sm text-textSecondary mt-2">{model.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-textPrimary">{selectedModel.name}</h4>
                <p className="text-sm text-textSecondary">{selectedModel.provider}</p>
              </div>
              
              <ApiKeyInput
                provider={selectedModel.provider}
                value={apiKey}
                onChange={setApiKey}
                placeholder={`Enter your ${selectedModel.provider} API key...`}
              />

              <div className="flex space-x-3">
                <button
                  onClick={() => handleAddIntegration(selectedModel)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Integration
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setSelectedModel(null)
                    setApiKey('')
                  }}
                  className="px-4 py-2 border border-gray-300 text-textSecondary rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Existing Integrations */}
      <div>
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Your Integrations</h2>
        {integrations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <div key={integration.id} className="space-y-4">
                <AIModelCard model={integration} />
                <div className="bg-surface p-4 rounded-lg shadow-card space-y-4">
                  <ApiKeyInput
                    provider={integration.provider}
                    value={integration.apiKey}
                    onSave={(newKey) => handleUpdateApiKey(integration.id, newKey)}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRemoveIntegration(integration.id)}
                      className="flex items-center px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface p-8 rounded-lg shadow-card text-center">
            <Settings className="w-12 h-12 text-textSecondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-textPrimary mb-2">No Integrations Yet</h3>
            <p className="text-textSecondary mb-4">
              Add your first AI model integration to get started.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Integration
            </button>
          </div>
        )}
      </div>
    </div>
  )
}