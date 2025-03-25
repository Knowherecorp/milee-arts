
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { getProductById, getRelatedProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  if (!id) {
    return (
      <MainLayout>
        <div className="page-container py-12 text-center">
          <h1 className="text-3xl font-serif font-medium mb-4">Product Not Found</h1>
          <p>We couldn't find the product you're looking for.</p>
        </div>
      </MainLayout>
    );
  }
  
  const product = getProductById(id);
  
  if (!product) {
    return (
      <MainLayout>
        <div className="page-container py-12 text-center">
          <h1 className="text-3xl font-serif font-medium mb-4">Product Not Found</h1>
          <p>We couldn't find the product you're looking for.</p>
          <Button onClick={() => navigate('/shop')} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const relatedProducts = getRelatedProducts(id);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to your cart`);
  };
  
  const nextImage = () => {
    setActiveImage((activeImage + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setActiveImage((activeImage - 1 + product.images.length) % product.images.length);
  };
  
  // Format category name for display
  const categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ');
  
  return (
    <MainLayout>
      <div className="page-container py-12 md:py-16">
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
            Shop
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link 
            to={`/category/${product.category}`} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {categoryName}
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product images */}
          <div>
            <div className="relative rounded-lg overflow-hidden aspect-square mb-4">
              <img 
                src={product.images[activeImage]} 
                alt={product.name}
                className="object-cover w-full h-full"
              />
              
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 shadow-md transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 shadow-md transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                  New
                </div>
              )}
              
              {!product.inStock && (
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
                  Sold Out
                </div>
              )}
            </div>
            
            {/* Thumbnail navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`rounded-md overflow-hidden flex-shrink-0 w-20 h-20 ${
                      activeImage === index 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : 'opacity-70 hover:opacity-100 transition-opacity'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - Image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div>
            <h1 className="text-3xl font-serif font-medium mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <p className="text-xl font-medium">${product.price.toFixed(2)}</p>
              {!product.inStock && (
                <span className="ml-3 text-sm bg-destructive/10 text-destructive px-2 py-1 rounded">
                  Out of Stock
                </span>
              )}
            </div>
            
            <div className="border-t border-border pt-6 pb-4">
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
              
              {/* Product details */}
              <div className="space-y-4 mb-8">
                <div className="flex">
                  <span className="w-32 text-muted-foreground">Artist:</span>
                  <span>{product.artistName}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-muted-foreground">Year:</span>
                  <span>{product.yearCreated}</span>
                </div>
                {product.dimensions && (
                  <div className="flex">
                    <span className="w-32 text-muted-foreground">Dimensions:</span>
                    <span>{product.dimensions}</span>
                  </div>
                )}
                {product.materials && (
                  <div className="flex">
                    <span className="w-32 text-muted-foreground">Materials:</span>
                    <span>{product.materials}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="w-32 text-muted-foreground">Category:</span>
                  <Link 
                    to={`/category/${product.category}`}
                    className="text-primary hover:underline"
                  >
                    {categoryName}
                  </Link>
                </div>
              </div>
              
              {/* Add to cart */}
              {product.inStock && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-4">Quantity:</span>
                    <div className="flex items-center border border-input rounded-md">
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full sm:w-auto flex-1 gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </Button>
                    <Button 
                      onClick={() => {
                        handleAddToCart();
                        navigate('/cart');
                      }}
                      variant="outline"
                      className="w-full sm:w-auto flex-1"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              )}
              
              {!product.inStock && (
                <p className="mb-4 text-muted-foreground">
                  This item is currently sold out. Please check back later or contact us for more information.
                </p>
              )}
            </div>
            
            {/* Shipping information */}
            <div className="border-t border-border pt-4">
              <h3 className="font-medium mb-2">Shipping & Returns</h3>
              <p className="text-sm text-muted-foreground mb-2">
                We offer free shipping on all orders within the continental United States. International shipping rates vary.
              </p>
              <Link to="/shipping" className="text-sm text-primary hover:underline">
                View our shipping & returns policy
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl font-serif font-medium mb-8">You May Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
