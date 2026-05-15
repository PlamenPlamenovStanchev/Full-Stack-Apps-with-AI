// Product type definition
export interface Product {
  title: string;
  photo: string;
  slug: string;
  description: string;
  isFeatured: boolean;
}

// Product data - can be replaced with database queries later
const products: Product[] = [
  {
    title: "Wireless Headphones",
    photo: "/images/headphones.jpg",
    slug: "wireless-headphones",
    description: "High-quality wireless headphones with excellent sound and comfort",
    isFeatured: true,
  },
  {
    title: "USB-C Cable",
    photo: "/images/usb-cable.jpg",
    slug: "usb-c-cable",
    description: "Durable USB-C cable for fast charging and data transfer",
    isFeatured: true,
  },
  {
    title: "Phone Stand",
    photo: "/images/phone-stand.jpg",
    slug: "phone-stand",
    description: "Adjustable phone stand for desk and hands-free viewing",
    isFeatured: false,
  },
  {
    title: "Screen Protector",
    photo: "/images/screen-protector.jpg",
    slug: "screen-protector",
    description: "Tempered glass screen protector with easy installation",
    isFeatured: false,
  },
  {
    title: "Protective Case",
    photo: "/images/phone-case.jpg",
    slug: "protective-case",
    description: "Durable protective case with shock absorption",
    isFeatured: true,
  },
];

/**
 * Get all products
 * @returns Array of all products
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Get product by slug
 * @param slug - The product slug
 * @returns Product if found, null otherwise
 */
export function getProductBySlug(slug: string): Product | null {
  return products.find((product) => product.slug === slug) || null;
}

/**
 * Get featured products
 * @returns Array of featured products
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured);
}
