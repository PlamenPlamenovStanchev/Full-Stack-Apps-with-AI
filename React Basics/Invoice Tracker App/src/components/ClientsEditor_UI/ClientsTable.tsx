import { motion } from 'framer-motion'
import { Edit2, Trash2 } from 'lucide-react'
import { Client, Company } from '../../data/types'

interface ClientsTableProps {
  clients: Client[]
  onEditClick: (client: Client) => void
  onDeleteClick: (clientId: string) => void
}

function isCompany(client: Client): client is Company {
  return client.type === 'company'
}

export function ClientsTable({ clients, onEditClick, onDeleteClick }: ClientsTableProps) {
  const handleDeleteClick = (clientId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDeleteClick(clientId)
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
              <th className="px-6 py-3 text-left font-medium text-slate-700">Type</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700">ID / Tax ID</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700">Address</th>
              <th className="px-6 py-3 text-center font-medium text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No clients found. Add your first client to get started.
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{client.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isCompany(client)
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {isCompany(client) ? 'Company' : 'Person'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {isCompany(client) ? client.taxId : client.personalId}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{client.address}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditClick(client)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(client.id, client.name)}
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
