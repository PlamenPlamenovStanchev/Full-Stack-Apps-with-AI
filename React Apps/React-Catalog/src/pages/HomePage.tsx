import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { getFeaturedProducts } from '../lib/products';
import type { Product } from '../types/product';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const featuredProducts = await getFeaturedProducts();
        setProducts(featuredProducts);
      } catch {
        setError('Failed to load featured products.');
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, []);

  return (
    <section aria-label="Home page" className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Welcome to React Catalog</h1>
        <p className="text-sm text-zinc-600">Discover featured products selected for you.</p>
      </header>

      {loading ? <p>Loading...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {!loading && !error ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={Number(product.price)}
              photoUrl={product.photo_url}
              featured={product.featured}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
