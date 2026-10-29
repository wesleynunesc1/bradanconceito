export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  mainImage: string;
  images: string[];
  price: string | null;
  priceDisplay: string;
  brand: string;
  inStock: boolean;
  description: string;
  tags: string[];
  createdAt: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  heroText: string;
  coverImage: string;
  productCount: number;
}

export interface StoreInfo {
  name: string;
  slogan: string;
  description: string;
  whatsapp: string;
  whatsappDisplay: string;
  instagram: string;
  location: string;
  schedule: string;
}

export interface CatalogData {
  store: StoreInfo;
  categories: Category[];
  products: Product[];
}

export interface BagItem {
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
  addedAt: number;
}
