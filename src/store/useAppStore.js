import { create } from 'zustand'

const useAppStore = create((set, get) => ({
  // AI Model Integrations
  integrations: [
    {
      id: '1',
      name: 'GPT-4',
      provider: 'OpenAI',
      status: 'active',
      apiKey: '',
      requests: 156,
      avgTime: '1.2s',
      cost: 24.50,
      lastUsed: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Claude-3',
      provider: 'Anthropic',
      status: 'inactive',
      apiKey: '',
      requests: 89,
      avgTime: '0.9s',
      cost: 12.30,
      lastUsed: new Date(Date.now() - 86400000).toISOString()
    }
  ],

  // Workflows
  workflows: [
    {
      id: '1',
      name: 'Content Summarization',
      description: 'Summarize long-form content using multiple AI models',
      steps: [
        { model: 'GPT-4', prompt: 'Summarize the following text in 3 bullet points: {input}' }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  // Benchmarks
  benchmarks: [
    {
      id: '1',
      taskName: 'Text Summarization',
      models: ['GPT-4', 'Claude-3'],
      results: [
        { model: 'GPT-4', responseTime: 1200, quality: 8.5, cost: 0.03 },
        { model: 'Claude-3', responseTime: 900, quality: 8.2, cost: 0.025 }
      ],
      timestamp: new Date().toISOString()
    }
  ],

  // Analytics data
  analyticsData: {
    usage: [
      { date: '2024-01-01', requests: 45, cost: 2.30 },
      { date: '2024-01-02', requests: 67, cost: 3.45 },
      { date: '2024-01-03', requests: 52, cost: 2.80 },
      { date: '2024-01-04', requests: 78, cost: 4.20 },
      { date: '2024-01-05', requests: 91, cost: 5.10 }
    ],
    modelDistribution: [
      { name: 'GPT-4', value: 156 },
      { name: 'Claude-3', value: 89 },
      { name: 'GPT-3.5', value: 234 }
    ]
  },

  // Actions
  addIntegration: (integration) => set((state) => ({
    integrations: [...state.integrations, { ...integration, id: Date.now().toString() }]
  })),

  updateIntegration: (id, updates) => set((state) => ({
    integrations: state.integrations.map(integration => 
      integration.id === id ? { ...integration, ...updates } : integration
    )
  })),

  removeIntegration: (id) => set((state) => ({
    integrations: state.integrations.filter(integration => integration.id !== id)
  })),

  addWorkflow: (workflow) => set((state) => ({
    workflows: [...state.workflows, { 
      ...workflow, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]
  })),

  updateWorkflow: (id, updates) => set((state) => ({
    workflows: state.workflows.map(workflow => 
      workflow.id === id ? { ...workflow, ...updates, updatedAt: new Date().toISOString() } : workflow
    )
  })),

  removeWorkflow: (id) => set((state) => ({
    workflows: state.workflows.filter(workflow => workflow.id !== id)
  })),

  addBenchmark: (benchmark) => set((state) => ({
    benchmarks: [...state.benchmarks, { 
      ...benchmark, 
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }]
  }))
}))

export default useAppStore