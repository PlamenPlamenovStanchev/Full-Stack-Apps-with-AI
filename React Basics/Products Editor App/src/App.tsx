import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import ProductsList from './components/ProductsList'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Header />
      <main className="py-5">
        <div className="container">
          <ProductsList />
        </div>
      </main>
    </>
  )
}

export default App
