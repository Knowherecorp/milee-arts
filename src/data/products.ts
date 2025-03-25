
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
    id: "painting-1",
    name: "Sunset Reflections",
    category: "paintings",
    price: 550,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhaW50aW5nfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhaW50aW5nfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhaW50aW5nfGVufDB8fDB8fHww"
    ],
    description: "A mesmerizing oil painting capturing the golden hues of a sunset reflecting over tranquil waters. This artwork brings warmth and serenity to any space with its luminous colors and calming atmosphere.",
    dimensions: "24\" × 36\"",
    materials: "Oil on canvas",
    inStock: true,
    featured: true,
    artistName: "Khushi Sharma",
    yearCreated: 2023
  },
  {
    id: "painting-2",
    name: "Abstract Harmony",
    category: "paintings",
    price: 725,
    images: [
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0JTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0JTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0JTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D"
    ],
    description: "An expressive abstract painting where vibrant colors dance across the canvas in perfect harmony. The piece invites viewers to explore their emotional responses to color, movement, and form.",
    dimensions: "30\" × 40\"",
    materials: "Acrylic on canvas",
    inStock: true,
    artistName: "Khushi Sharma",
    yearCreated: 2023
  },
  {
    id: "painting-3",
    name: "Midnight Forest",
    category: "paintings",
    price: 485,
    images: [
      "https://images.unsplash.com/photo-1613080838917-c5473e767542?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvcmVzdCUyMHBhaW50aW5nfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1613080838917-c5473e767542?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvcmVzdCUyMHBhaW50aW5nfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1613080838917-c5473e767542?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvcmVzdCUyMHBhaW50aW5nfGVufDB8fDB8fHww"
    ],
    description: "A mystical forest scene bathed in moonlight, where the dark silhouettes of trees stand against a starlit sky. This painting evokes a sense of wonder and quiet contemplation.",
    dimensions: "18\" × 24\"",
    materials: "Oil on canvas",
    inStock: true,
    isNew: true,
    artistName: "Khushi Sharma",
    yearCreated: 2024
  },
  {
    id: "sculpture-1",
    name: "Eternal Balance",
    category: "sculptures",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1543083115-638c462ba8fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2N1bHB0dXJlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1543083115-638c462ba8fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2N1bHB0dXJlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1543083115-638c462ba8fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2N1bHB0dXJlfGVufDB8fDB8fHww"
    ],
    description: "A bronze sculpture that captures two abstract forms in perfect equilibrium. This piece represents the delicate balance found in nature and human relationships, creating a focal point that draws the eye and provokes thought.",
    dimensions: "16\" × 8\" × 6\"",
    materials: "Bronze",
    inStock: true,
    featured: true,
    artistName: "Khushi Sharma",
    yearCreated: 2022
  },
  {
    id: "sculpture-2",
    name: "Fluid Motion",
    category: "sculptures",
    price: 950,
    images: [
      "https://images.unsplash.com/photo-1544277581-540707ce14fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2N1bHB0dXJlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1544277581-540707ce14fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2N1bHB0dXJlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1544277581-540707ce14fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2N1bHB0dXJlfGVufDB8fDB8fHww"
    ],
    description: "A dynamic marble sculpture that captures the essence of movement frozen in time. The smooth, curving lines suggest water or wind, creating a sense of flow that contrasts beautifully with the solidity of the material.",
    dimensions: "12\" × 18\" × 8\"",
    materials: "Marble",
    inStock: true,
    isNew: true,
    artistName: "Khushi Sharma",
    yearCreated: 2024
  },
  {
    id: "sculpture-3",
    name: "Geometric Unity",
    category: "sculptures",
    price: 875,
    images: [
      "https://images.unsplash.com/photo-1547706276-da6a8bd2b311?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjdWxwdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1547706276-da6a8bd2b311?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjdWxwdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1547706276-da6a8bd2b311?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjdWxwdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
    ],
    description: "A modern sculpture featuring interconnected geometric shapes that create a harmonious whole. Made from polished metal, the reflective surfaces play with light to create ever-changing visual effects throughout the day.",
    dimensions: "20\" × 14\" × 14\"",
    materials: "Stainless steel",
    inStock: false,
    artistName: "Khushi Sharma",
    yearCreated: 2023
  },
  {
    id: "resin-1",
    name: "Ocean Depths",
    category: "resin-art",
    price: 425,
    images: [
      "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzaW4lMjBhcnR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzaW4lMjBhcnR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzaW4lMjBhcnR8ZW58MHx8MHx8fDA%3D"
    ],
    description: "A stunning resin artwork that captures the ethereal beauty of ocean depths. Multiple layers of translucent blue and teal resin create a three-dimensional effect, with white accents mimicking sea foam and waves.",
    dimensions: "24\" × 24\"",
    materials: "Epoxy resin, acrylic paint, wood panel",
    inStock: true,
    featured: true,
    artistName: "Khushi Sharma",
    yearCreated: 2023
  },
  {
    id: "resin-2",
    name: "Geode Slice",
    category: "resin-art",
    price: 390,
    images: [
      "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzaW4lMjBhcnR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzaW4lMjBhcnR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzaW4lMjBhcnR8ZW58MHx8MHx8fDA%3D"
    ],
    description: "A beautiful resin wall hanging inspired by natural geode formations. This piece features concentric rings of purple, amethyst, and clear resin with gold leaf accents that catch the light brilliantly.",
    dimensions: "18\" diameter, 1.5\" thick",
    materials: "Epoxy resin, alcohol ink, gold leaf",
    inStock: true,
    isNew: true,
    artistName: "Khushi Sharma",
    yearCreated: 2024
  },
  {
    id: "resin-3",
    name: "Forest Floor",
    category: "resin-art",
    price: 510,
    images: [
      "https://images.unsplash.com/photo-1625055930842-b0d65aa3d92a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzaW4lMjBhcnR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1625055930842-b0d65aa3d92a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzaW4lMjBhcnR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1625055930842-b0d65aa3d92a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzaW4lMjBhcnR8ZW58MHx8MHx8fDA%3D"
    ],
    description: "A nature-inspired resin serving tray that encapsulates real moss, tiny pinecones, and other botanical elements from the forest floor. Protected within layers of crystal-clear resin, this functional art piece brings nature to your table.",
    dimensions: "16\" × 12\" × 2\"",
    materials: "Epoxy resin, natural botanical elements, wood frame",
    inStock: true,
    artistName: "Khushi Sharma",
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
