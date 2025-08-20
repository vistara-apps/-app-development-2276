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
  Brain,
  ChevronRight,
  User,
  Bell,
  HelpCircle
} from 'lucide-react'
import clsx from 'clsx'
import Breadcrumbs from './Breadcrumbs'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, description: 'Overview of your AI models' },
  { name: 'Integrations', href: '/integrations', icon: Puzzle, description: 'Connect and manage AI models' },
  { name: 'Benchmarks', href: '/benchmarks', icon: Zap, description: 'Compare model performance' },
  { name: 'Workflows', href: '/workflows', icon: Workflow, description: 'Create AI-powered workflows' },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, description: 'Track usage and costs' },
  { name: 'Settings', href: '/settings', icon: Settings, description: 'Manage your account' },
]

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Extract the current page title from navigation
  const currentPage = navigation.find(item => 
    item.href === location.pathname
  ) || { name: 'Dashboard' }

  // Skip link for keyboard users (accessibility)
  const SkipLink = () => (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  )

  return (
    <div className="flex h-screen bg-bg">
      <SkipLink />
      
      {/* Mobile sidebar overlay */}
      <div className={clsx(
        'fixed inset-0 z-50 lg:hidden transition-opacity duration-300',
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}>
        <div 
          className="fixed inset-0 bg-black/50" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
        
        {/* Mobile sidebar panel */}
        <div 
          className={clsx(
            'fixed left-0 top-0 h-full w-72 bg-surface shadow-xl transform transition-transform duration-300 ease-in-out',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-textPrimary">AI Assembler</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-textSecondary hover:text-textPrimary p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="mt-6 px-3" aria-label="Sidebar">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={clsx(
                    'flex items-center px-3 py-2 mb-2 text-sm font-medium rounded-md transition-all duration-200',
                    isActive
                      ? 'bg-primaryLight text-primary border-l-4 border-primary pl-2'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-gray-100'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <div>{item.name}</div>
                    <p className="text-xs text-textTertiary mt-0.5">{item.description}</p>
                  </div>
                </Link>
              )
            })}
          </nav>
          
          {/* Mobile user menu */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-textPrimary">John Doe</p>
                <p className="text-xs text-textSecondary">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-surface border-r border-gray-200">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Brain className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-textPrimary">AI Assembler</span>
          </div>
          
          <nav className="flex-1 px-4 py-6" aria-label="Sidebar">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center px-3 py-2 mb-2 text-sm font-medium rounded-md transition-all duration-200',
                    isActive
                      ? 'bg-primaryLight text-primary border-l-4 border-primary pl-2'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-gray-100'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <div>{item.name}</div>
                    <p className="text-xs text-textTertiary mt-0.5">{item.description}</p>
                  </div>
                </Link>
              )
            })}
          </nav>
          
          {/* Desktop user menu */}
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-textPrimary">John Doe</p>
                <p className="text-xs text-textSecondary">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:pl-72">
        {/* Top navigation */}
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-surface border-b border-gray-200">
          <div className="flex flex-1 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden -ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md text-textSecondary hover:text-textPrimary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* Mobile title (lg:hidden) */}
            <div className="lg:hidden flex items-center">
              <Brain className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="ml-2 text-lg font-semibold text-textPrimary">AI Assembler</span>
            </div>
            
            {/* Desktop title (hidden on mobile) */}
            <div className="hidden lg:flex lg:items-center">
              <h1 className="text-2xl font-semibold text-textPrimary">{currentPage.name}</h1>
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="rounded-full p-1.5 text-textSecondary hover:text-textPrimary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
              </button>
              
              <button
                type="button"
                className="rounded-full p-1.5 text-textSecondary hover:text-textPrimary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Help"
              >
                <HelpCircle className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-1 overflow-auto animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
