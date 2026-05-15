'use client';

import { useState } from 'react';
import { useCart } from '@/lib/useCart';
import { Product } from '@/lib/app-data';

interface AddToCartProps {
  product: Product;
  className?: string;
}

export function AddToCart({ product, className = '' }: AddToCartProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);

    // Reset the feedback after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <button
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
          className="px-3 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          −
        </button>
        <span className="text-lg font-semibold text-gray-900 min-w-12 text-center">
          {quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="px-3 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-semibold"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
          isAdded
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isAdded ? '✓ Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  );
}
