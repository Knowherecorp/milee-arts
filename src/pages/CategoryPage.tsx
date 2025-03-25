
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/product/ProductGrid';
import { getProductsByCategory } from '@/data/products';

const getCategoryTitle = (slug: string) => {
  switch (slug) {
    case 'paintings':
      return 'Paintings';
    case 'sculptures':
      return 'Sculptures';
    case 'resin-art':
      return 'Resin Art';
    default:
      return slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
  }
};

const getCategoryDescription = (slug: string) => {
  switch (slug) {
    case 'paintings':
      return 'Explore our collection of original paintings, from abstract expressions to realistic depictions, each capturing unique emotions and stories.';
    case 'sculptures':
      return 'Discover tactile three-dimensional artwork that transforms spaces with form, texture, and artistic vision.';
    case 'resin-art':
      return 'Browse our stunning resin art pieces with their characteristic depth, shine, and ethereal quality.';
    default:
      return 'Explore our collection of handcrafted artworks.';
  }
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return (
      <MainLayout>
        <div className="page-container py-12 text-center">
          <h1 className="text-3xl font-serif font-medium mb-4">Category Not Found</h1>
          <p>We couldn't find the category you're looking for.</p>
        </div>
      </MainLayout>
    );
  }
  
  const products = getProductsByCategory(slug);
  const categoryTitle = getCategoryTitle(slug);
  const categoryDescription = getCategoryDescription(slug);
  
  return (
    <MainLayout>
      <div className="bg-secondary/30 py-12 md:py-16">
        <div className="page-container text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">{categoryTitle}</h1>
          <p className="text-muted-foreground">{categoryDescription}</p>
        </div>
      </div>
      
      <div className="page-container py-12 md:py-16">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No products found in this category</h3>
            <p className="text-muted-foreground">
              Check back soon as we're constantly adding new pieces.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
