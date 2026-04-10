import { Product } from '../types/Product'
import './StatsPanel.css'

interface StatsPanelProps {
  products: Product[]
}

export default function StatsPanel({ products }: StatsPanelProps) {
  const totalValue = products.reduce((sum, p) => sum + p.price, 0)
  const avgPrice = products.length > 0 ? totalValue / products.length : 0
  const highestPrice = products.length > 0 ? Math.max(...products.map((p) => p.price)) : 0
  const lowestPrice = products.length > 0 ? Math.min(...products.map((p) => p.price)) : 0

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: 'bi-box-seam',
      color: 'primary',
    },
    {
      label: 'Total Value',
      value: `$${totalValue.toFixed(2)}`,
      icon: 'bi-currency-dollar',
      color: 'success',
    },
    {
      label: 'Average Price',
      value: `$${avgPrice.toFixed(2)}`,
      icon: 'bi-graph-up',
      color: 'info',
    },
    {
      label: 'Price Range',
      value: `$${lowestPrice.toFixed(2)} - $${highestPrice.toFixed(2)}`,
      icon: 'bi-bar-chart',
      color: 'warning',
    },
  ]

  return (
    <div className="stats-panel">
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">
              <i className={`bi ${stat.icon}`}></i>
            </div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
