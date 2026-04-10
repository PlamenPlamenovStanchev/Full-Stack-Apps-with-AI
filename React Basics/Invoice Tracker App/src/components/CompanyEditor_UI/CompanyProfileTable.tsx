import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Loader } from 'lucide-react'
import { Company } from '../../data/types'
import { CompanyProfileModal } from './CompanyProfileModal'

interface CompanyProfileTableProps {
  company: Company | null
  onSave: (company: Company) => void
}

export function CompanyProfileTable({ company, onSave }: CompanyProfileTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!company) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3 text-amber-700"
      >
        <Loader size={20} />
        <span>No company profile found. Please create one first.</span>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
      >
        <table className="w-full">
          <tbody>
            <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-700">Company Name</td>
              <td className="px-6 py-4 text-slate-600">{company.name}</td>
            </tr>
            <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-700">Company ID</td>
              <td className="px-6 py-4 text-slate-600">{company.id}</td>
            </tr>
            <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-700">Tax ID</td>
              <td className="px-6 py-4 text-slate-600">{company.taxId}</td>
            </tr>
            <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-700">Address</td>
              <td className="px-6 py-4 text-slate-600">{company.address}</td>
            </tr>
            <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-700">Manager</td>
              <td className="px-6 py-4 text-slate-600">{company.manager}</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-700">IBAN</td>
              <td className="px-6 py-4 text-slate-600">{company.iban}</td>
            </tr>
          </tbody>
        </table>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Edit2 size={18} />
            Edit Company
          </button>
        </div>
      </motion.div>

      <CompanyProfileModal
        isOpen={isModalOpen}
        company={company}
        onClose={() => setIsModalOpen(false)}
        onSave={(updated) => {
          onSave(updated)
          setIsModalOpen(false)
        }}
      />
    </>
  )
}
