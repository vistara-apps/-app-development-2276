import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Integrations = lazy(() => import('./pages/Integrations'))
const Benchmarks = lazy(() => import('./pages/Benchmarks'))
const Workflows = lazy(() => import('./pages/Workflows'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Settings = lazy(() => import('./pages/Settings'))

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-full w-full p-8">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
)

function App() {
  return (
    <>
      {/* Skip link for keyboard users (accessibility) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <AppShell>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/benchmarks" element={<Benchmarks />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </AppShell>
    </>
  )
}

export default App
