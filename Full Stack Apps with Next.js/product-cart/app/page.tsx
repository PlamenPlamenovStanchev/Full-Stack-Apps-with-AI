import Link from "next/link";
import { getFeaturedProducts } from "@/lib/app-data";

// ISR: Revalidate every 5 minutes (300 seconds)
export const revalidate = 300;

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ProductCart</h1>
          <p className="text-lg text-blue-100 mb-6">
            Discover our amazing collection of quality products. Shop featured items below or explore all our products.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full flex flex-col">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-48 flex items-center justify-center text-4xl">
                  📦
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{product.description}</p>
                  <div className="text-blue-600 font-medium">View Details →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
