import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import { store } from '../data/store'
import { AppData, Client, Company, Person } from '../data/types'
import { ClientsTable } from './ClientsEditor_UI/ClientsTable'
import { ClientTypeSelector } from './ClientsEditor_UI/ClientTypeSelector'
import { ClientModal } from './ClientsEditor_UI/ClientModal'

export function ClientsEditor() {
  const [appData, setAppData] = useState<AppData | null>(null)
  const [isTypeSelectorOpen, setIsTypeSelectorOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClientType, setSelectedClientType] = useState<'company' | 'person' | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  useEffect(() => {
    const data = store.getData()
    setAppData(data)
  }, [])

  if (!appData) return null

  const handleAddClick = () => {
    setEditingClient(null)
    setSelectedClientType(null)
    setIsTypeSelectorOpen(true)
  }

  const handleTypeSelect = (type: 'company' | 'person') => {
    setSelectedClientType(type)
    setIsTypeSelectorOpen(false)
    setIsModalOpen(true)
  }

  const handleEditClick = (client: Client) => {
    setEditingClient(client)
    setSelectedClientType(client.type)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (clientId: string) => {
    const updated = {
      ...appData,
      clients: appData.clients.filter(c => c.id !== clientId)
    }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Client deleted!')
  }

  const handleSaveClient = (client: Company | Person) => {
    let updated: AppData

    if (editingClient) {
      // Edit existing client
      updated = {
        ...appData,
        clients: appData.clients.map(c => c.id === client.id ? client : c)
      }
      toast.success('Client updated!')
    } else {
      // Add new client
      updated = {
        ...appData,
        clients: [...appData.clients, client]
      }
      toast.success('Client added!')
    }

    setAppData(updated)
    store.saveData(updated)
    setIsModalOpen(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Clients</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Client
        </button>
      </div>

      <ClientsTable
        clients={appData.clients}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <ClientTypeSelector
        isOpen={isTypeSelectorOpen}
        onClose={() => setIsTypeSelectorOpen(false)}
        onSelect={handleTypeSelect}
      />

      <ClientModal
        isOpen={isModalOpen}
        clientType={selectedClientType}
        client={editingClient}
        onClose={() => {
          setIsModalOpen(false)
          setEditingClient(null)
        }}
        onSave={handleSaveClient}
      />
    </motion.div>
  )
}
