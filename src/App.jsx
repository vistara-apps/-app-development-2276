import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import Integrations from './pages/Integrations'
import Benchmarks from './pages/Benchmarks'
import Workflows from './pages/Workflows'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/benchmarks" element={<Benchmarks />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppShell>
  )
}

export default App