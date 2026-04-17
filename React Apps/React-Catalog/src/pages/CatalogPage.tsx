import { FormEvent, useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { getProducts, PRODUCTS_PER_PAGE } from '../lib/products';
import type { Product } from '../types/product';

export function CatalogPage() {
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / PRODUCTS_PER_PAGE));

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getProducts({ page, keyword, pageSize: PRODUCTS_PER_PAGE });
        setProducts(result.items);
        setTotalCount(result.totalCount);
      } catch {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, [keyword, page]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setKeyword(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setKeyword('');
    setPage(1);
  };

  return (
    <section aria-label="Catalog page" className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Catalog</h1>
        <p className="text-sm text-zinc-600">Browse all products, search by keyword, and open details.</p>
      </header>

      <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search by title or description"
          className="min-w-64 flex-1 rounded border border-zinc-300 px-3 py-2 text-sm"
        />
        <button type="submit" className="rounded border border-zinc-300 px-3 py-2 text-sm">
          Search
        </button>
        <button type="button" onClick={handleClearSearch} className="rounded border border-zinc-300 px-3 py-2 text-sm">
          Clear
        </button>
      </form>

      {loading ? <p>Loading...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {!loading && !error ? (
        <>
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

          {products.length === 0 ? <p>No products found.</p> : null}

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page <= 1}
              className="rounded border border-zinc-300 px-3 py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-sm">
              Page {page} of {totalPages}
            </p>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page >= totalPages}
              className="rounded border border-zinc-300 px-3 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
}
