'use server';

import Link from "next/link";
import { getProductBySlug, getAllProducts } from "@/lib/app-data";
import { AddToCart } from "@/components/AddToCart";
import { notFound } from "next/navigation";

// Dynamic Rendering: Don't cache, render on every request
export const dynamic = 'force-dynamic';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600 transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{product.title}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center min-h-96">
          <div className="text-6xl">📦</div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
              {product.isFeatured && (
                <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                  ⭐ Featured
                </span>
              )}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 mb-2">Product Price:</p>
            <p className="text-3xl font-bold text-blue-600">$99.99</p>
          </div>

          <AddToCart product={product} />

          <button className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            ❤️ Save for Later
          </button>

          {/* Product Meta */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-gray-600 text-sm mb-1">Availability</p>
              <p className="font-semibold text-green-600">In Stock</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Category</p>
              <p className="font-semibold text-gray-900">Electronics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-12 pt-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getAllProducts()
            .filter((p) => p.slug !== product.slug)
            .slice(0, 3)
            .map((relatedProduct) => (
              <Link
                key={relatedProduct.slug}
                href={`/products/${relatedProduct.slug}`}
              >
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-40 flex items-center justify-center text-3xl">
                    📦
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedProduct.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Back Button */}
      <div className="mt-8">
        <Link
          href="/products"
          className="inline-block px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
