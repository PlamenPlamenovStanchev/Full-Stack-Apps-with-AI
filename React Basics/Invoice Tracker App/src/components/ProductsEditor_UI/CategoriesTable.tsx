import { motion } from 'framer-motion'
import { Edit2, Trash2 } from 'lucide-react'
import { ProductCategory } from '../../data/types'

interface CategoriesTableProps {
  categories: ProductCategory[]
  onEditClick: (category: ProductCategory) => void
  onDeleteClick: (categoryId: string) => void
}

export function CategoriesTable({ categories, onEditClick, onDeleteClick }: CategoriesTableProps) {
  const handleDeleteClick = (categoryId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDeleteClick(categoryId)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-slate-700">Name</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700">Description</th>
              <th className="px-6 py-3 text-center font-medium text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                  No categories found. Add your first category.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{category.name}</td>
                  <td className="px-6 py-4 text-slate-600">{category.description}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditClick(category)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category.id, category.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
