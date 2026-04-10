export interface Company {
  id: string;
  type: 'company';
  name: string;
  taxId: string;
  address: string;
  manager: string;
  iban: string;
}

export interface Person {
  id: string;
  type: 'person';
  name: string;
  personalId: string;
  address: string;
}

export type Client = Company | Person;

export interface Supplier {
  id: string;
  name: string;
  description: string;
  contactPerson: string;
  phone: string;
  email: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currencyId: string;
  unit: string;
  supplierId: string;
  categoryId: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  quantity: number;
  salePrice: number;
  valueWithoutVat: number;
  vatRate: number;
  vatValue: number;
  valueWithVat: number;
}

export interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  issuer: Company;
  recipient: Client;
  items: InvoiceItem[];
  amountSubtotal: number;
  vatAmount: number;
  totalAmount: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
}

export interface InvoicePayment {
  id: string;
  invoiceId: string;
  datePaid: string;
  paymentMethodId: string;
  amount: number;
}

export interface Currency {
  id: string;
  name: string;
  description: string;
  symbol: string;
}

export interface AppSettings {
  defaultVATPercentage: number;
  baseCurrencyId: string;
}

export interface AppData {
  companyProfile: Company | null;
  appSettings: AppSettings;
  currencies: Currency[];
  clients: Client[];
  suppliers: Supplier[];
  categories: ProductCategory[];
  products: Product[];
  invoices: Invoice[];
  paymentMethods: PaymentMethod[];
  invoicePayments: InvoicePayment[];
}
