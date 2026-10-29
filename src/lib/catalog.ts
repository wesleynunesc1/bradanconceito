import rawCatalog from '@/data/catalog.json';
import { CatalogData, Product, Category, StoreInfo } from '@/types';

export const catalog: CatalogData = rawCatalog as CatalogData;

export function getStoreInfo(): StoreInfo {
  return catalog.store;
}

export function getAllCategories(): Category[] {
  return catalog.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return catalog.categories.find(c => c.slug === slug);
}

export function getAllProducts(): Product[] {
  return catalog.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return catalog.products.filter(p => p.categorySlug === categorySlug);
}

export function getRelatedProducts(currentSlug: string, limit = 4): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return catalog.products.slice(0, limit);

  const sameCategory = catalog.products.filter(
    p => p.categorySlug === current.categorySlug && p.slug !== currentSlug
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = catalog.products.filter(
    p => p.categorySlug !== current.categorySlug && p.slug !== currentSlug
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getFeaturedProducts(limit = 8): Product[] {
  // Curate an editorial selection representing diverse categories
  const slugsWanted = [
    'tenis-armani-exchange',
    'camisa-polo-aramis-texturizada',
    'loafer-marrom',
    'camisetas-casuais-fred-perry',
    'camisa-zara-basica-premium',
    'shorts-masculino-casual-sarja',
    'perfume-arabe-badee-al-oud',
    'tenis-casual-branco-premium',
    'bone-polo-ralph-lauren',
    'calca-jeans-premium'
  ];

  const curated = slugsWanted
    .map(s => catalog.products.find(p => p.slug === s))
    .filter((p): p is Product => !!p);

  if (curated.length >= limit) return curated.slice(0, limit);
  return catalog.products.slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return catalog.products.slice(-limit);
}

export function buildProductWhatsAppLink(product: Product, host = ''): string {
  const phone = catalog.store.whatsapp;
  const productUrl = `${host}/produto/${product.slug}`;
  const text = `Olá! Vi o produto *${product.name}* no catálogo da *BRADAN MODA MASCULINA* e gostaria de consultar valor e disponibilidade.\n\nLink da peça: ${productUrl}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function buildBagWhatsAppLink(items: { product: Product; quantity: number }[], host = ''): string {
  const phone = catalog.store.whatsapp;
  let text = `Olá! Montei uma sacola de interesse no catálogo da *BRADAN MODA MASCULINA* e gostaria de consultar valores, tamanhos e disponibilidade para as seguintes peças:\n\n`;

  items.forEach((item, idx) => {
    const pUrl = `${host}/produto/${item.product.slug}`;
    text += `${idx + 1}. *${item.product.name}* (${item.product.category})\n   Link: ${pUrl}\n`;
  });

  text += `\nPoderiam me informar sobre a disponibilidade e condições de envio?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
