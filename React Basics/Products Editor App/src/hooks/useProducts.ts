import { useState, useEffect } from 'react'
import { Product, ProductInput } from '../types/Product'
import { SAMPLE_PRODUCTS } from '../data/sampleProducts'

const STORAGE_KEY = 'products_data'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load products from local storage on mount
  useEffect(() => {
    const loadProducts = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsedProducts = JSON.parse(stored)
          setProducts(parsedProducts)
        } else {
          // Initialize with sample data if no existing data
          localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PRODUCTS))
          setProducts(SAMPLE_PRODUCTS)
        }
      } catch (error) {
        console.error('Failed to load products from localStorage:', error)
        // Fallback to sample data
        setProducts(SAMPLE_PRODUCTS)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Save products to local storage whenever they change
  const saveToStorage = (newProducts: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts))
    } catch (error) {
      console.error('Failed to save products to localStorage:', error)
    }
  }

  const addProduct = (productInput: ProductInput): Product => {
    const newProduct: Product = {
      ...productInput,
      id: Date.now().toString(),
    }
    const newProducts = [...products, newProduct]
    setProducts(newProducts)
    saveToStorage(newProducts)
    return newProduct
  }

  const updateProduct = (id: string, productInput: ProductInput): Product | null => {
    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex === -1) return null

    const updatedProduct: Product = {
      ...productInput,
      id,
    }
    const newProducts = [
      ...products.slice(0, productIndex),
      updatedProduct,
      ...products.slice(productIndex + 1),
    ]
    setProducts(newProducts)
    saveToStorage(newProducts)
    return updatedProduct
  }

  const deleteProduct = (id: string): boolean => {
    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex === -1) return false

    const newProducts = [...products.slice(0, productIndex), ...products.slice(productIndex + 1)]
    setProducts(newProducts)
    saveToStorage(newProducts)
    return true
  }

  const clearAll = () => {
    setProducts([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const resetToSampleData = () => {
    setProducts(SAMPLE_PRODUCTS)
    saveToStorage(SAMPLE_PRODUCTS)
  }

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    clearAll,
    resetToSampleData,
  }
}
