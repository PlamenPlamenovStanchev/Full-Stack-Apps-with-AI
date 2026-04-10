import { useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { CompanyEditor } from './components/CompanyEditor'
import { ClientsEditor } from './components/ClientsEditor'
import { ProductsEditor } from './components/ProductsEditor'
import { InvoicesEditor } from './components/InvoicesEditor'
import { TrackerEditor } from './components/TrackerEditor'

type Tab = 'company' | 'clients' | 'products' | 'invoices' | 'tracker'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('invoices')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'company', label: 'My Company' },
    { id: 'clients', label: 'Clients' },
    { id: 'products', label: 'Products' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'tracker', label: 'Tracker' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Toaster position="top-right" />
      
      {/* App Header & Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl uppercase tracking-tighter">IT</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Invoice Tracker</span>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <nav className="flex space-x-1 outline-none -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-6 font-medium text-sm border-b-2 transition-colors outline-none
                  ${activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area - Full width layout based on max-w container */}
      <main className="flex-1 w-full mx-auto p-4 sm:p-6 lg:p-8 mb-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {activeTab === 'company' && <CompanyEditor />}
          {activeTab === 'clients' && <ClientsEditor />}
          {activeTab === 'products' && <ProductsEditor />}
          {activeTab === 'invoices' && <InvoicesEditor />}
          {activeTab === 'tracker' && <TrackerEditor />}
        </motion.div>
      </main>

      {/* App Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Invoice Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

