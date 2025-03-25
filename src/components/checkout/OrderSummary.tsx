
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';

interface OrderSummaryProps {
  paymentMethod: string;
}

const OrderSummary = ({ paymentMethod }: OrderSummaryProps) => {
  const { items, subtotal } = useCart();
  
  // Calculate costs
  const shippingCost = 0; // Free shipping
  const taxRate = 0.18; // 18% GST
  const taxAmount = subtotal * taxRate;
  const totalCost = subtotal + shippingCost + taxAmount;
  
  return (
    <div className="bg-secondary/20 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-serif font-medium mb-4">Order Summary</h2>
      
      {/* Order items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src={item.product.images[0]} 
                alt={item.product.name} 
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
            </div>
            <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      {/* Cost summary */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'Free'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">GST (18%)</span>
          <span>₹{taxAmount.toFixed(2)}</span>
        </div>
        {paymentMethod === 'cod' && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">COD Fee</span>
            <span>₹50.00</span>
          </div>
        )}
      </div>
      
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>₹{(paymentMethod === 'cod' ? totalCost + 50 : totalCost).toFixed(2)}</span>
        </div>
      </div>
      
      <Button type="submit" className="w-full" size="lg">
        Place Order
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-4">
        By placing your order, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default OrderSummary;
