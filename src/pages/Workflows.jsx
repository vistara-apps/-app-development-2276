import React, { useState } from 'react'
import { Plus, Play, Edit, Trash2, Workflow as WorkflowIcon } from 'lucide-react'
import AlertMessage from '../components/AlertMessage'
import useAppStore from '../store/useAppStore'

export default function Workflows() {
  const { workflows, integrations, addWorkflow, updateWorkflow, removeWorkflow } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [editingWorkflow, setEditingWorkflow] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    steps: [{ model: '', prompt: '' }]
  })
  const [alert, setAlert] = useState(null)

  const activeModels = integrations.filter(i => i.status === 'active')

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      steps: [{ model: '', prompt: '' }]
    })
    setEditingWorkflow(null)
    setShowForm(false)
  }

  const handleEdit = (workflow) => {
    setEditingWorkflow(workflow)
    setFormData({
      name: workflow.name,
      description: workflow.description,
      steps: workflow.steps
    })
    setShowForm(true)
  }

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      setAlert({ variant: 'error', message: 'Please provide name and description' })
      return
    }

    if (formData.steps.some(step => !step.model || !step.prompt.trim())) {
      setAlert({ variant: 'error', message: 'Please complete all workflow steps' })
      return
    }

    if (editingWorkflow) {
      updateWorkflow(editingWorkflow.id, formData)
      setAlert({ variant: 'success', message: 'Workflow updated successfully!' })
    } else {
      addWorkflow(formData)
      setAlert({ variant: 'success', message: 'Workflow created successfully!' })
    }

    resetForm()
  }

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { model: '', prompt: '' }]
    }))
  }

  const updateStep = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === index ? { ...step, [field]: value } : step
      )
    }))
  }

  const removeStep = (index) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }))
  }

  const handleDelete = (workflowId) => {
    removeWorkflow(workflowId)
    setAlert({ variant: 'success', message: 'Workflow deleted successfully!' })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-textPrimary">AI Workflows</h1>
          <p className="mt-2 text-textSecondary">
            Create and manage custom AI-powered workflows.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
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

      {/* Workflow Form */}
      {showForm && (
        <div className="bg-surface p-6 rounded-lg shadow-card">
          <h3 className="text-lg font-semibold text-textPrimary mb-6">
            {editingWorkflow ? 'Edit Workflow' : 'Create New Workflow'}
          </h3>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Workflow Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Content Summarization"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the workflow"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            {/* Workflow Steps */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-textPrimary">
                  Workflow Steps
                </label>
                <button
                  onClick={addStep}
                  className="text-sm text-accent hover:text-blue-700"
                >
                  + Add Step
                </button>
              </div>

              <div className="space-y-4">
                {formData.steps.map((step, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-textPrimary">Step {index + 1}</h4>
                      {formData.steps.length > 1 && (
                        <button
                          onClick={() => removeStep(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-textSecondary mb-1">
                          AI Model
                        </label>
                        <select
                          value={step.model}
                          onChange={(e) => updateStep(index, 'model', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        >
                          <option value="">Select model...</option>
                          {activeModels.map((model) => (
                            <option key={model.id} value={model.name}>
                              {model.name} ({model.provider})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-textSecondary mb-1">
                          Prompt Template
                        </label>
                        <textarea
                          value={step.prompt}
                          onChange={(e) => updateStep(index, 'prompt', e.target.value)}
                          placeholder="e.g., Summarize the following text: {input}"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                        <p className="text-xs text-textSecondary mt-1">
                          Use {'{input}'} as a placeholder for dynamic content
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingWorkflow ? 'Update Workflow' : 'Create Workflow'}
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 text-textSecondary rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workflows List */}
      <div>
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Your Workflows</h2>
        {workflows.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="bg-surface p-6 rounded-lg shadow-card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-textPrimary">{workflow.name}</h3>
                    <p className="text-sm text-textSecondary mt-1">{workflow.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(workflow)}
                      className="p-1 text-textSecondary hover:text-accent"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(workflow.id)}
                      className="p-1 text-textSecondary hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-textSecondary">
                    <strong>{workflow.steps.length}</strong> step{workflow.steps.length !== 1 ? 's' : ''}
                  </div>
                  
                  {workflow.steps.map((step, index) => (
                    <div key={index} className="text-sm border-l-2 border-accent pl-3">
                      <div className="font-medium text-textPrimary">{step.model}</div>
                      <div className="text-textSecondary truncate">{step.prompt}</div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-textSecondary">
                    Updated {new Date(workflow.updatedAt).toLocaleDateString()}
                  </div>
                  <button className="flex items-center px-3 py-1 text-sm text-accent hover:bg-blue-50 rounded-md transition-colors">
                    <Play className="w-3 h-3 mr-1" />
                    Run
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface p-8 rounded-lg shadow-card text-center">
            <WorkflowIcon className="w-12 h-12 text-textSecondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-textPrimary mb-2">No Workflows Yet</h3>
            <p className="text-textSecondary mb-4">
              Create your first workflow to automate AI tasks.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Workflow
            </button>
          </div>
        )}
      </div>
    </div>
  )
}