'use client';

import Link from 'next/link';
import { useCart } from '@/lib/useCart';
import { CartItem } from '@/lib/useCart';

export function CartContent() {
  const { cart, isLoaded, removeFromCart, updateQuantity, clearCart } = useCart();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Start shopping to add items to your cart.</p>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce((total, item) => total + (item.quantity * 99.99), 0); // Placeholder price
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
        <div className="space-y-4">
          {cart.map((item: CartItem) => (
            <div
              key={item.slug}
              className="flex gap-4 bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Product Image Placeholder */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                📦
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="text-blue-600 font-semibold">$99.99</div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-200">
                  <button
                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.slug)}
                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm font-medium"
                >
                  Remove
                </button>

                <div className="text-right">
                  <div className="text-xs text-gray-600">Subtotal</div>
                  <div className="text-lg font-bold text-gray-900">
                    ${(item.quantity * 99.99).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={clearCart}
          className="mt-6 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
        >
          Clear Cart
        </button>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
          </div>

          <div className="flex justify-between mb-6 text-lg">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>

          <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
            Proceed to Checkout
          </button>

          <Link
            href="/products"
            className="block w-full px-4 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
