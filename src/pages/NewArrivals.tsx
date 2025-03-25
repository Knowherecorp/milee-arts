
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/product/ProductGrid';
import { getNewArrivals } from '@/data/products';
import Newsletter from '@/components/home/Newsletter';

const NewArrivals = () => {
  const newProducts = getNewArrivals();
  
  return (
    <MainLayout>
      <div className="bg-secondary/30 py-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">New Arrivals</h1>
            <p className="text-lg text-muted-foreground">
              Discover our latest artworks, fresh from the studio
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container py-16 md:py-24">
        {newProducts.length > 0 ? (
          <>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
              Each of these pieces has been recently created and added to our collection. From vibrant new paintings to innovative sculptures and resin art, these works showcase the latest creative directions in our studio.
            </p>
            
            <ProductGrid products={newProducts} />
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif font-medium mb-4">No new arrivals at the moment</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're currently working on new pieces. Subscribe to our newsletter to be the first to know when new artwork is available.
            </p>
          </div>
        )}
      </div>
      
      <Newsletter />
    </MainLayout>
  );
};

export default NewArrivals;
