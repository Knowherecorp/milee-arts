
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  // Generate a random order number
  const orderNumber = `RBK-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  return (
    <MainLayout>
      <div className="page-container py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-primary" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">Thank You for Your Order!</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Your order #{orderNumber} has been placed successfully. We've sent a confirmation email with all the details.
          </p>
          
          <div className="bg-secondary/20 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-serif font-medium mb-4">What Happens Next?</h2>
            
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">1</span>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-muted-foreground">We're preparing your artwork for shipment.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">2</span>
                <div>
                  <p className="font-medium">Shipment</p>
                  <p className="text-muted-foreground">You'll receive a notification when your order ships with tracking information.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">3</span>
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-muted-foreground">Your artwork will be carefully delivered to your doorstep.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">4</span>
                <div>
                  <p className="font-medium">Enjoy!</p>
                  <p className="text-muted-foreground">Hang, display, and enjoy your new artwork.</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/shop">
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmation;
