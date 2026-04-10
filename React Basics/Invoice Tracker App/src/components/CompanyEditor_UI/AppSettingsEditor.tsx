import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppSettings } from '../../data/types'

interface AppSettingsEditorProps {
  settings: AppSettings
  onSave: (settings: AppSettings) => void
}

export function AppSettingsEditor({ settings, onSave }: AppSettingsEditorProps) {
  const [vatValue, setVatValue] = useState(settings.defaultVATPercentage)

  const handleSetVatValue = () => {
    onSave({ ...settings, defaultVATPercentage: vatValue })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-6"
    >
      <h3 className="text-lg font-semibold mb-6 text-slate-800">App Settings</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700">Default VAT Percentage (%)</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={vatValue}
              onChange={(e) => setVatValue(parseFloat(e.target.value) || 0)}
              className="w-32 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSetVatValue}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Save
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-2">Current VAT: {settings.defaultVATPercentage}%</p>
        </div>
      </div>
    </motion.div>
  )
}
