interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  location: string;
  createdAt: string;
}

export default function ListingCard({ id, title, price, imageUrl, location, createdAt }: ListingCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <img 
        src={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{title}</h3>
        <p className="text-2xl font-semibold text-blue-600">${price.toLocaleString()}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <span>{location}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <a 
          href={`/listing/${id}`} 
          className="mt-4 block text-center w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded font-medium transition-colors"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
