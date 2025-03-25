
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, Trash } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  
  const handleUpdateQuantity = (productId: string, currentQuantity: number, amount: number) => {
    const newQuantity = currentQuantity + amount;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const shippingCost = items.length > 0 ? 0 : 0; // Free shipping
  const totalCost = subtotal + shippingCost;
  
  return (
    <MainLayout>
      <div className="page-container py-12 md:py-16">
        <h1 className="text-3xl font-serif font-medium mb-8">Your Cart</h1>
        
        {items.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Cart items */}
              <div className="border rounded-lg overflow-hidden">
                {/* Headers (desktop only) */}
                <div className="hidden md:grid grid-cols-12 gap-4 bg-secondary/50 p-4">
                  <div className="col-span-7">
                    <span className="font-medium">Product</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Quantity</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Price</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span className="sr-only">Actions</span>
                  </div>
                </div>
                
                {/* Cart items */}
                {items.map((item) => (
                  <div key={item.product.id} className="border-t first:border-t-0 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product info */}
                      <div className="md:col-span-7 flex items-center gap-4">
                        <Link to={`/product/${item.product.id}`} className="shrink-0">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </Link>
                        <div>
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-medium hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.product.category.charAt(0).toUpperCase() + 
                              item.product.category.slice(1).replace('-', ' ')}
                          </p>
                        </div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="md:hidden">Quantity:</span>
                        <div className="flex items-center border border-input rounded-md">
                          <button 
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity, -1)}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity, 1)}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="md:hidden">Price:</span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      {/* Remove button */}
                      <div className="md:col-span-1 flex justify-end">
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Cart actions */}
              <div className="mt-4 flex justify-between items-center">
                <Button variant="outline" onClick={() => clearCart()}>
                  Clear Cart
                </Button>
                
                <Button asChild variant="outline">
                  <Link to="/shop">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 bg-secondary/20">
                <h2 className="text-xl font-serif font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free'}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${totalCost.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Taxes calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 max-w-lg mx-auto">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={48} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-serif font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any artwork to your cart yet. Explore our collection to find pieces you'll love.
            </p>
            <Button asChild size="lg">
              <Link to="/shop">
                Explore Our Collection
              </Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
