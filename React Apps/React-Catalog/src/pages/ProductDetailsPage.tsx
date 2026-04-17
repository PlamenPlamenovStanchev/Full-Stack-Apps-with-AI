import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../lib/products';
import type { Product } from '../types/product';

export function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsedId = Number(id);
    if (!id || Number.isNaN(parsedId)) {
      setError('Invalid product ID.');
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const foundProduct = await getProductById(parsedId);
        setProduct(foundProduct);
      } catch {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [id]);

  return (
    <section aria-label="Product details page" className="space-y-6">
      <Link to="/products" className="inline-block text-sm underline">
        Back to catalog
      </Link>

      {loading ? <p>Loading...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {!loading && !error && product ? (
        <article className="overflow-hidden rounded border border-zinc-200 bg-white">
          <img src={product.photo_url} alt={product.title} className="h-72 w-full object-cover" />
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              {product.featured ? <span className="text-xs font-medium uppercase text-zinc-500">Featured</span> : null}
            </div>
            <p className="text-sm text-zinc-700">{product.description}</p>
            <p className="text-lg font-semibold">${Number(product.price).toFixed(2)}</p>
          </div>
        </article>
      ) : null}
    </section>
  );
}
