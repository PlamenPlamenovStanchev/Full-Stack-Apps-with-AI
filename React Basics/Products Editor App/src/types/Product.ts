export interface Product {
  id: string
  name: string
  description: string
  photoUrl: string
  price: number
  currency: string
  unit: string
}

export type ProductInput = Omit<Product, 'id'>
