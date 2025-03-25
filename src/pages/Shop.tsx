import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/product/ProductGrid';
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const Shop = () => {
  const allProducts = getAllProducts();
  const [products, setProducts] = useState(allProducts);
  
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  
  const maxPrice = Math.max(...allProducts.map(p => p.price));
  
  // Filter and sort products
  const filterProducts = () => {
    let filtered = [...allProducts];
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep default order
        break;
    }
    
    setProducts(filtered);
  };
  
  // Apply filters when any filter option changes
  React.useEffect(() => {
    filterProducts();
  }, [category, sortBy, priceRange]);
  
  // Reset all filters
  const resetFilters = () => {
    setCategory('all');
    setSortBy('default');
    setPriceRange([0, maxPrice]);
  };
  
  return (
    <MainLayout>
      <div className="page-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2">Shop All Artworks</h1>
            <p className="text-muted-foreground">
              Browse our collection of handcrafted original artworks
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Featured</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                <SelectItem value="name-z-a">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={category === 'all' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setCategory('all')}
                >
                  All Categories
                </Button>
                <Button
                  variant={category === 'paintings' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setCategory('paintings')}
                >
                  Paintings
                </Button>
                <Button
                  variant={category === 'sculptures' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setCategory('sculptures')}
                >
                  Sculptures
                </Button>
                <Button
                  variant={category === 'resin-art' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setCategory('resin-art')}
                >
                  Resin Art
                </Button>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Price Range</h3>
                <span className="text-sm text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[0, maxPrice]}
                value={priceRange}
                max={maxPrice}
                step={10}
                onValueChange={setPriceRange}
                className="mb-4"
              />
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
          
          {/* Product grid */}
          <div className="md:col-span-3">
            {products.length > 0 ? (
              <>
                <ProductGrid products={products} columns={3} />
                <div className="mt-8 text-center text-muted-foreground">
                  Showing {products.length} of {products.length} products
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to find what you're looking for.</p>
                <Button onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Shop;
