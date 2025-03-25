
import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '@/components/product/ProductGrid';
import { getFeaturedProducts } from '@/data/products';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <section className="py-16 md:py-24">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Featured Artworks</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our most celebrated pieces, each one a testament to artistic excellence and creative vision.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/shop">
              View All Artworks
            </Link>
          </Button>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
