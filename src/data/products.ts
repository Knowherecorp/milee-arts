export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  dimensions?: string;
  materials?: string;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  artistName?: string;
  yearCreated?: number;
}

export const products: Product[] = [
  {
    id: "product-1",
    name: "Misty Mountains",
    category: "paintings",
    price: 12500,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    description: "A breathtaking landscape painting showcasing the majestic beauty of misty mountains at dawn. The soft color palette and delicate brushwork create an ethereal atmosphere that transports viewers to a peaceful natural setting.",
    dimensions: "24 x 36 inches",
    materials: "Oil on canvas",
    inStock: true,
    featured: true,
    artistName: "Khushi Gupta",
    yearCreated: 2023
  },
  {
    id: "product-2",
    name: "Eternal Bloom",
    category: "paintings",
    price: 9800,
    images: [
      "https://images.unsplash.com/photo-1579783928621-7a13d66a62b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    description: "This vibrant floral painting captures the beauty and resilience of nature. Each petal is meticulously detailed, creating a sense of depth and movement within the composition.",
    dimensions: "18 x 24 inches",
    materials: "Acrylic on canvas",
    inStock: true,
    featured: true,
    isNew: true,
    artistName: "Khushi Gupta",
    yearCreated: 2024
  },
  {
    id: "product-3",
    name: "Serene Waters",
    category: "resin-art",
    price: 7500,
    images: [
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    description: "A stunning resin art piece that mimics the tranquil flow of ocean waters. Multiple layers of translucent resin create depth and dimension, with metallic accents that catch the light as you move around the piece.",
    dimensions: "20 x 20 inches",
    materials: "Epoxy resin, acrylic, metallic pigments",
    inStock: true,
    featured: true,
    artistName: "Khushi Gupta",
    yearCreated: 2024
  },
  {
    id: "product-4",
    name: "Modern Minimalist Sculpture",
    category: "sculptures",
    price: 18500,
    images: [
      "https://images.unsplash.com/photo-1581092336208-9d71f1a3628f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    description: "A contemporary minimalist sculpture that explores the balance between negative and positive space. The clean lines and smooth finish create an elegant presence that enhances any modern interior.",
    dimensions: "12 x 8 x 24 inches",
    materials: "Polished marble",
    inStock: true,
    isNew: true,
    artistName: "Khushi Gupta",
    yearCreated: 2024
  },
  {
    id: "product-5",
    name: "Cosmic Swirl",
    category: "resin-art",
    price: 6800,
    images: [
      "https://images.unsplash.com/photo-1623656882601-2a37733d901d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    description: "A captivating resin art piece inspired by distant galaxies and cosmic phenomena. The swirling patterns and deep colors create a mesmerizing effect that draws viewers in.",
    dimensions: "16 inch diameter",
    materials: "Epoxy resin, alcohol inks, metallic pigments",
    inStock: true,
    featured: true,
    isNew: true,
    artistName: "Khushi Gupta",
    yearCreated: 2024
  },
  {
    id: "product-6",
    name: "Abstract Vision",
    category: "paintings",
    price: 11200,
    images: [
      "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    description: "A bold abstract painting that plays with form, color, and texture. The dynamic composition invites multiple interpretations and creates a focal point in any space.",
    dimensions: "30 x 40 inches",
    materials: "Mixed media on canvas",
    inStock: true,
    featured: true,
    artistName: "Khushi Gupta",
    yearCreated: 2023
  },
  {
    id: "product-7",
    name: "Nature's Harmony",
    category: "sculptures",
    price: 14500,
    images: [
      "https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    description: "A flowing sculptural piece that celebrates the organic forms found in nature. The intertwining elements create a sense of movement and harmony.",
    dimensions: "18 x 10 x 12 inches",
    materials: "Carved wood, metal accents",
    inStock: true,
    isNew: true,
    artistName: "Khushi Gupta",
    yearCreated: 2024
  },
  {
    id: "product-8",
    name: "Ocean Geode",
    category: "resin-art",
    price: 8900,
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    description: "A stunning resin geode artwork that mimics the crystalline structure of natural geodes with ocean-inspired colors. The piece features multiple layers of transparent and opaque resin with subtle shimmer elements.",
    dimensions: "24 inch diameter",
    materials: "Epoxy resin, crystals, metallic pigments, gold leaf",
    inStock: false,
    featured: true,
    artistName: "Khushi Gupta",
    yearCreated: 2023
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  return products
    .filter(product => 
      product.id !== productId && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
};
