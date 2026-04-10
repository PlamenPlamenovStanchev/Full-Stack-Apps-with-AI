import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { store } from '../data/store'
import { AppData } from '../data/types'
import { CompanyProfileTable } from './CompanyEditor_UI/CompanyProfileTable'
import { AppSettingsEditor } from './CompanyEditor_UI/AppSettingsEditor'
import { CurrenciesEditor } from './CompanyEditor_UI/CurrenciesEditor'
import { PaymentMethodsEditor } from './CompanyEditor_UI/PaymentMethodsEditor'

export function CompanyEditor() {
  const [appData, setAppData] = useState<AppData | null>(null)

  useEffect(() => {
    const data = store.getData()
    setAppData(data)
  }, [])

  if (!appData) return null

  const handleCompanySave = (updatedCompany: typeof appData.companyProfile) => {
    const updated = { ...appData, companyProfile: updatedCompany }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Company profile updated!')
  }

  const handleAppSettingsSave = (updatedSettings: typeof appData.appSettings) => {
    const updated = { ...appData, appSettings: updatedSettings }
    setAppData(updated)
    store.saveData(updated)
    toast.success('App settings updated!')
  }

  const handleAddCurrency = (currency: typeof appData.currencies[0]) => {
    const updated = { ...appData, currencies: [...appData.currencies, currency] }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Currency added!')
  }

  const handleEditCurrency = (currency: typeof appData.currencies[0]) => {
    const updated = {
      ...appData,
      currencies: appData.currencies.map(c => c.id === currency.id ? currency : c)
    }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Currency updated!')
  }

  const handleDeleteCurrency = (currencyId: string) => {
    const updated = {
      ...appData,
      currencies: appData.currencies.filter(c => c.id !== currencyId)
    }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Currency deleted!')
  }

  const handleAddPaymentMethod = (method: typeof appData.paymentMethods[0]) => {
    const updated = { ...appData, paymentMethods: [...appData.paymentMethods, method] }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Payment method added!')
  }

  const handleEditPaymentMethod = (method: typeof appData.paymentMethods[0]) => {
    const updated = {
      ...appData,
      paymentMethods: appData.paymentMethods.map(m => m.id === method.id ? method : m)
    }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Payment method updated!')
  }

  const handleDeletePaymentMethod = (methodId: string) => {
    const updated = {
      ...appData,
      paymentMethods: appData.paymentMethods.filter(m => m.id !== methodId)
    }
    setAppData(updated)
    store.saveData(updated)
    toast.success('Payment method deleted!')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Company Profile Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Company Profile</h2>
        <CompanyProfileTable 
          company={appData.companyProfile}
          onSave={handleCompanySave}
        />
      </div>

      {/* App Settings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Settings</h2>
        <div className="space-y-6">
          <AppSettingsEditor
            settings={appData.appSettings}
            onSave={handleAppSettingsSave}
          />

          <CurrenciesEditor
            currencies={appData.currencies}
            onAddCurrency={handleAddCurrency}
            onEditCurrency={handleEditCurrency}
            onDeleteCurrency={handleDeleteCurrency}
          />

          <PaymentMethodsEditor
            paymentMethods={appData.paymentMethods}
            onAddPaymentMethod={handleAddPaymentMethod}
            onEditPaymentMethod={handleEditPaymentMethod}
            onDeletePaymentMethod={handleDeletePaymentMethod}
          />
        </div>
      </div>
    </motion.div>
  )
}
