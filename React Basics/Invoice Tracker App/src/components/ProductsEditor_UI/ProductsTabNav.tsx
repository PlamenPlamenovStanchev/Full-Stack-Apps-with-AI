interface ProductsTabNavProps {
  activeTab: 'products' | 'categories' | 'suppliers'
  onTabChange: (tab: 'products' | 'categories' | 'suppliers') => void
}

export function ProductsTabNav({ activeTab, onTabChange }: ProductsTabNavProps) {
  const tabs = [
    { id: 'products' as const, label: 'Products' },
    { id: 'categories' as const, label: 'Categories' },
    { id: 'suppliers' as const, label: 'Suppliers' },
  ]

  return (
    <div className="flex space-x-1 border-b border-slate-200 -mb-px">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            whitespace-nowrap py-3 px-4 font-medium text-sm border-b-2 transition-colors outline-none
            ${activeTab === tab.id
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
