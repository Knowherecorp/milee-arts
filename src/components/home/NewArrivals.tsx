
import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '@/components/product/ProductGrid';
import { getNewArrivals } from '@/data/products';
import { Button } from '@/components/ui/button';

const NewArrivals = () => {
  const newProducts = getNewArrivals();
  
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">New Arrivals</h2>
            <p className="text-muted-foreground max-w-2xl">
              Be among the first to discover our latest creations, fresh from the artist's studio.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/new-arrivals">
              View All New Arrivals
            </Link>
          </Button>
        </div>
        
        <ProductGrid products={newProducts} />
      </div>
    </section>
  );
};

export default NewArrivals;
