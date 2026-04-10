import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Company, Person } from '../../data/types'

interface ClientModalProps {
  isOpen: boolean
  clientType: 'company' | 'person' | null
  client: (Company | Person) | null
  onClose: () => void
  onSave: (client: Company | Person) => void
}

export function ClientModal({ isOpen, clientType, client, onClose, onSave }: ClientModalProps) {
  const [formData, setFormData] = useState<any>({
    name: '',
    taxId: '',
    address: '',
    manager: '',
    personalId: '',
  })

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        taxId: 'taxId' in client ? client.taxId : '',
        personalId: 'personalId' in client ? client.personalId : '',
        address: client.address,
        manager: 'manager' in client ? client.manager : '',
      })
    } else {
      setFormData({
        name: '',
        taxId: '',
        personalId: '',
        address: '',
        manager: '',
      })
    }
  }, [client, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (clientType === 'company') {
      const companyData: Company = {
        id: client?.id || `client_${Date.now()}`,
        type: 'company',
        name: formData.name,
        taxId: formData.taxId,
        address: formData.address,
        manager: formData.manager,
        iban: 'iban' in (client || {}) ? (client as Company).iban : '',
      }
      onSave(companyData)
    } else {
      const personData: Person = {
        id: client?.id || `client_${Date.now()}`,
        type: 'person',
        name: formData.name,
        personalId: formData.personalId,
        address: formData.address,
      }
      onSave(personData)
    }
  }

  if (!isOpen || !clientType) return null

  const isCompany = clientType === 'company'
  const isEditing = client !== null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-lg max-w-lg w-full"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Client' : `Add ${isCompany ? 'Company' : 'Person'}`}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {isCompany ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Tax ID</label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Manager Name</label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Personal ID / SSN</label>
              <input
                type="text"
                value={formData.personalId}
                onChange={(e) => setFormData({ ...formData, personalId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              {isEditing ? 'Update' : 'Add'} Client
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
