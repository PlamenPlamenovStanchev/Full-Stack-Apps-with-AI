import { Link } from 'react-router-dom';

type ProductCardProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  photoUrl: string;
  featured?: boolean;
};

export function ProductCard({
  id,
  title,
  description,
  price,
  photoUrl,
  featured = false
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded border border-zinc-200 bg-white">
      <img src={photoUrl} alt={title} className="h-44 w-full object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold">{title}</h3>
          {featured ? <span className="text-xs font-medium uppercase text-zinc-500">Featured</span> : null}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{description}</p>
        <p className="mt-3 text-sm font-semibold">${price.toFixed(2)}</p>
        <Link to={`/product/${id}`} className="mt-4 inline-block text-sm underline">
        View details
        </Link>
      </div>
    </article>
  );
}
