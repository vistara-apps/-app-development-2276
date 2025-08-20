import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Puzzle, 
  Zap, 
  Workflow, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  Brain
} from 'lucide-react'
import clsx from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Integrations', href: '/integrations', icon: Puzzle },
  { name: 'Benchmarks', href: '/benchmarks', icon: Zap },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen bg-bg">
      {/* Mobile sidebar */}
      <div className={clsx(
        'fixed inset-0 z-50 lg:hidden',
        sidebarOpen ? 'block' : 'hidden'
      )}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-surface shadow-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-textPrimary">AI Assembler</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-textSecondary hover:text-textPrimary"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-6 px-3">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={clsx(
                    'flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-gray-100'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-surface border-r border-gray-200">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Brain className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-textPrimary">AI Assembler</span>
          </div>
          <nav className="flex-1 px-3 py-6">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-gray-100'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center h-16 px-4 bg-surface border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-textSecondary hover:text-textPrimary"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-4 flex items-center">
            <Brain className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold text-textPrimary">AI Assembler</span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}