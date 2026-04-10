import { AppData, Company, Person, Supplier, ProductCategory, Product, Invoice, PaymentMethod, Currency } from './types';

const sampleCurrencies: Currency[] = [
  { id: 'curr_eur', name: 'EUR', description: 'Euro', symbol: '€' },
  { id: 'curr_usd', name: 'USD', description: 'US Dollar', symbol: '$' },
  { id: 'curr_gbp', name: 'GBP', description: 'British Pound', symbol: '£' },
];

const samplePaymentMethods: PaymentMethod[] = [
  { id: 'pm_bank', name: 'Bank Transfer', description: 'Direct transfer to checking account' },
  { id: 'pm_card', name: 'Credit Card', description: 'Payment via credit/debit card' },
  { id: 'pm_cash', name: 'Cash', description: 'Physical cash payment' },
];

const sampleCompanyProfile: Company = {
  id: 'comp_me',
  type: 'company',
  name: 'Acme Web Services',
  taxId: 'BG123456789',
  address: '10 Innovation Blvd, Tech City, 1000',
  manager: 'Jane Doe',
  iban: 'BGNX123456789012345678'
};

const sampleClients: (Company | Person)[] = [
  {
    id: 'client_1',
    type: 'company',
    name: 'Global Tech Corp',
    taxId: 'US987654321',
    address: '123 Business Rd, New York, NY',
    manager: 'John Smith',
    iban: 'US12345678901234567890'
  },
  {
    id: 'client_2',
    type: 'person',
    name: 'Alice Johnson',
    personalId: '8501012345',
    address: '45 Residential St, Springfield, IL'
  }
];

const sampleSuppliers: Supplier[] = [
  {
    id: 'sup_1',
    name: 'Cloud Hosting Inc',
    description: 'Server and cloud infrastructure',
    contactPerson: 'Mike Ross',
    phone: '+1 555-0100',
    email: 'billing@cloudhosting.inc'
  }
];

const sampleCategories: ProductCategory[] = [
  { id: 'cat_1', name: 'Web Development', description: 'Website creation and maintenance' },
  { id: 'cat_2', name: 'Consulting', description: 'IT and business consulting hours' },
  { id: 'cat_3', name: 'Software Licenses', description: 'Monthly/Yearly subscriptions' }
];

const sampleProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Landing Page Package',
    price: 1500.00,
    currencyId: 'curr_usd',
    unit: 'project',
    supplierId: 'self',
    categoryId: 'cat_1'
  },
  {
    id: 'prod_2',
    name: 'IT Architecture Consultation',
    price: 150.00,
    currencyId: 'curr_usd',
    unit: 'hour',
    supplierId: 'self',
    categoryId: 'cat_2'
  }
];

const sampleInvoices: Invoice[] = [
  {
    id: 'INV-2026-001',
    date: '2026-04-01',
    dueDate: '2026-04-15',
    issuer: sampleCompanyProfile,
    recipient: sampleClients[0],
    amountSubtotal: 1500.00,
    vatAmount: 300.00,
    totalAmount: 1800.00,
    status: 'paid',
    items: [
      {
        id: 'item_1',
        productId: 'prod_1',
        quantity: 1,
        salePrice: 1500.00,
        valueWithoutVat: 1500.00,
        vatRate: 20,
        vatValue: 300.00,
        valueWithVat: 1800.00
      }
    ]
  },
  {
    id: 'INV-2026-002',
    date: '2026-04-08',
    dueDate: '2026-04-22',
    issuer: sampleCompanyProfile,
    recipient: sampleClients[1],
    amountSubtotal: 450.00,
    vatAmount: 90.00,
    totalAmount: 540.00,
    status: 'pending',
    items: [
      {
        id: 'item_2',
        productId: 'prod_2',
        quantity: 3,
        salePrice: 150.00,
        valueWithoutVat: 450.00,
        vatRate: 20,
        vatValue: 90.00,
        valueWithVat: 540.00
      }
    ]
  }
];

export const initialData: AppData = {
  companyProfile: sampleCompanyProfile,
  appSettings: {
    defaultVATPercentage: 20,
    baseCurrencyId: 'curr_usd',
  },
  currencies: sampleCurrencies,
  paymentMethods: samplePaymentMethods,
  clients: sampleClients,
  suppliers: sampleSuppliers,
  categories: sampleCategories,
  products: sampleProducts,
  invoices: sampleInvoices,
  invoicePayments: [
    {
      id: 'pay_1',
      invoiceId: 'INV-2026-001',
      datePaid: '2026-04-05',
      paymentMethodId: 'pm_bank',
      amount: 1800.00
    }
  ]
};
