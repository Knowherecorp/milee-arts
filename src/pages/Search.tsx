
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/product/ProductGrid';
import { getAllProducts, Product } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const allProducts = getAllProducts();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };
  
  useEffect(() => {
    if (initialQuery) {
      setIsSearching(true);
      
      // Simulate search delay
      const timer = setTimeout(() => {
        const searchResults = allProducts.filter(product => {
          const searchString = `${product.name} ${product.category} ${product.description}`.toLowerCase();
          return searchString.includes(initialQuery.toLowerCase());
        });
        
        setResults(searchResults);
        setIsSearching(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [initialQuery, allProducts]);
  
  return (
    <MainLayout>
      <div className="page-container py-16 md:py-24">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-8 text-center">Search Our Collection</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search for artworks, categories, materials..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="flex-shrink-0">
              <SearchIcon size={20} className="mr-2" />
              Search
            </Button>
          </form>
        </div>
        
        {initialQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-serif mb-4">
              {isSearching ? (
                'Searching...'
              ) : (
                results.length > 0 ? (
                  `Found ${results.length} results for "${initialQuery}"`
                ) : (
                  `No results found for "${initialQuery}"`
                )
              )}
            </h2>
          </div>
        )}
        
        {!isSearching && results.length > 0 && (
          <ProductGrid products={results} />
        )}
        
        {!isSearching && initialQuery && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              We couldn't find any artwork matching your search. Please try different keywords or browse our categories.
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              <Button asChild variant="outline">
                <a href="/category/paintings">Paintings</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/category/sculptures">Sculptures</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/category/resin-art">Resin Art</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/shop">All Artwork</a>
              </Button>
            </div>
          </div>
        )}
        
        {!initialQuery && (
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Enter keywords above to search our collection of original artwork
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="font-serif font-medium mb-2">Browse by Category</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore our collection by artistic medium
                </p>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="/category/paintings">Paintings</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="/category/sculptures">Sculptures</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="/category/resin-art">Resin Art</a>
                  </Button>
                </div>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="font-serif font-medium mb-2">Featured Collections</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover our specially curated artwork collections
                </p>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="/shop">Featured Artworks</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="/new-arrivals">New Arrivals</a>
                  </Button>
                </div>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="font-serif font-medium mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Not sure what you're looking for? We're here to help.
                </p>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="/contact">Contact Us</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="/faq">View FAQ</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
