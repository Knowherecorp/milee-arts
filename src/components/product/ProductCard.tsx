
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ShoppingCart, IndianRupee } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addItem } = useCart();
  
  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md bg-white",
        className
      )}
    >
      <Link 
        to={`/product/${product.id}`}
        className="aspect-square relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity z-10"></div>
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3 z-20 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
            New
          </div>
        )}
        {!product.inStock && (
          <div className="absolute top-3 right-3 z-20 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
            Sold Out
          </div>
        )}
      </Link>
      
      <div className="flex flex-col p-4 flex-grow">
        <div className="mb-auto">
          <h3 className="text-lg font-serif font-medium">
            <Link 
              to={`/product/${product.id}`}
              className="hover:underline"
            >
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="font-medium flex items-center">
            <IndianRupee size={16} className="mr-1" />
            {product.price.toFixed(2)}
          </span>
          <Button 
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            size="sm"
            variant="outline"
            className="h-9 gap-1.5"
          >
            <ShoppingCart size={15} />
            <span className="sr-only md:not-sr-only md:inline-block">
              Add to Cart
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
