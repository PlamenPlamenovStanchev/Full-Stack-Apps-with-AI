'use client';

import Link from 'next/link';
import { useCart } from '@/lib/useCart';

export function CartLink() {
  const { cart, isLoaded } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (!isLoaded) {
    return (
      <Link href="/cart" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
        🛒 Cart
      </Link>
    );
  }

  return (
    <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
      🛒 Cart
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
