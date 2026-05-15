'use server';

import Link from "next/link";
import { getAllProducts } from "@/lib/app-data";

// Dynamic Rendering: Don't cache, render on every request
export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 6;

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const allProducts = getAllProducts();

  // Calculate pagination
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = allProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">
          Browse our complete collection of {allProducts.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`}>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full flex flex-col">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-48 flex items-center justify-center text-4xl">
                📦
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {product.title}
                  </h3>
                  {product.isFeatured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="text-blue-600 font-medium text-sm">
                  View Details →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {safeCurrentPage > 1 && (
            <Link
              href={`/products?page=${safeCurrentPage - 1}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Previous
            </Link>
          )}

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/products?page=${page}`}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  page === safeCurrentPage
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </Link>
            ))}
          </div>

          {safeCurrentPage < totalPages && (
            <Link
              href={`/products?page=${safeCurrentPage + 1}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
