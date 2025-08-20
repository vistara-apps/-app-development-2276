import React, { useState } from 'react'
import { Play, Clock, Award, DollarSign } from 'lucide-react'
import AlertMessage from '../components/AlertMessage'
import useAppStore from '../store/useAppStore'

export default function Benchmarks() {
  const { integrations, benchmarks, addBenchmark } = useAppStore()
  const [taskName, setTaskName] = useState('')
  const [inputText, setInputText] = useState('')
  const [selectedModels, setSelectedModels] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [alert, setAlert] = useState(null)

  const activeModels = integrations.filter(i => i.status === 'active')

  const handleModelToggle = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  const runBenchmark = async () => {
    if (!taskName.trim() || !inputText.trim() || selectedModels.length < 2) {
      setAlert({ variant: 'error', message: 'Please provide task name, input text, and select at least 2 models' })
      return
    }

    setIsRunning(true)
    setAlert(null)

    try {
      // Simulate API calls and benchmarking
      const results = []
      
      for (const modelId of selectedModels) {
        const model = integrations.find(i => i.id === modelId)
        
        // Simulate response time and quality scoring
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500))
        
        const responseTime = Math.floor(Math.random() * 2000 + 500)
        const quality = Math.random() * 2 + 7 // 7-9 range
        const cost = Math.random() * 0.05 + 0.01 // $0.01-0.06 range
        
        results.push({
          model: model.name,
          responseTime,
          quality: Number(quality.toFixed(1)),
          cost: Number(cost.toFixed(3))
        })
      }

      const benchmark = {
        taskName,
        models: selectedModels.map(id => integrations.find(i => i.id === id).name),
        results,
        inputText
      }

      addBenchmark(benchmark)
      setAlert({ variant: 'success', message: 'Benchmark completed successfully!' })
      
      // Reset form
      setTaskName('')
      setInputText('')
      setSelectedModels([])
      
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to run benchmark. Please try again.' })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-textPrimary">Performance Benchmarking</h1>
        <p className="mt-2 text-textSecondary">
          Compare AI models side-by-side on specific tasks.
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

      {/* Benchmark Setup */}
      <div className="bg-surface p-6 rounded-lg shadow-card">
        <h2 className="text-xl font-semibold text-textPrimary mb-6">Create New Benchmark</h2>
        
        <div className="space-y-6">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g., Text Summarization, Question Answering"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Input Text */}
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Input Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter the text to be processed by the AI models..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Select Models to Compare
            </label>
            {activeModels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeModels.map((model) => (
                  <label
                    key={model.id}
                    className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(model.id)}
                      onChange={() => handleModelToggle(model.id)}
                      className="mr-3 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                    />
                    <div>
                      <div className="font-medium text-textPrimary">{model.name}</div>
                      <div className="text-sm text-textSecondary">{model.provider}</div>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-textSecondary">
                No active models available. Please add and activate models in the Integrations section.
              </div>
            )}
          </div>

          {/* Run Button */}
          <div className="flex justify-end">
            <button
              onClick={runBenchmark}
              disabled={isRunning || selectedModels.length < 2}
              className="flex items-center px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running Benchmark...' : 'Run Benchmark'}
            </button>
          </div>
        </div>
      </div>

      {/* Previous Benchmarks */}
      <div>
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Previous Benchmarks</h2>
        {benchmarks.length > 0 ? (
          <div className="space-y-4">
            {benchmarks.map((benchmark) => (
              <div key={benchmark.id} className="bg-surface p-6 rounded-lg shadow-card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-textPrimary">{benchmark.taskName}</h3>
                    <p className="text-sm text-textSecondary">
                      {new Date(benchmark.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-sm text-textSecondary">
                    {benchmark.models.length} models compared
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {benchmark.results.map((result, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-textPrimary mb-3">{result.model}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="flex items-center text-sm text-textSecondary">
                            <Clock className="w-4 h-4 mr-1" />
                            Response Time
                          </span>
                          <span className="text-sm font-medium">{result.responseTime}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center text-sm text-textSecondary">
                            <Award className="w-4 h-4 mr-1" />
                            Quality Score
                          </span>
                          <span className="text-sm font-medium">{result.quality}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center text-sm text-textSecondary">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Cost
                          </span>
                          <span className="text-sm font-medium">${result.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface p-8 rounded-lg shadow-card text-center">
            <Play className="w-12 h-12 text-textSecondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-textPrimary mb-2">No Benchmarks Yet</h3>
            <p className="text-textSecondary">
              Run your first benchmark to compare AI model performance.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}