import Link from 'next/link';
import { CartContent } from '@/components/CartContent';

// Static Rendering: Build time only, cached and reused for all requests
export const dynamic = 'force-static';

export const metadata = {
  title: 'Shopping Cart - ProductCart',
  description: 'View and manage your shopping cart',
};

export default function CartPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">Shopping Cart</span>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">Review and manage your items</p>
      </div>

      {/* Cart Content */}
      <CartContent />
    </div>
  );
}
