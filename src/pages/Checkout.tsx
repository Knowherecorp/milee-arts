
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';

// Components
import ContactInformation from '@/components/checkout/ContactInformation';
import ShippingAddress from '@/components/checkout/ShippingAddress';
import PaymentInformation from '@/components/checkout/PaymentInformation';
import OrderSummary from '@/components/checkout/OrderSummary';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'IN',
    saveInfo: true,
    shipToDifferentAddress: false,
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });
  
  // Redirect to cart if no items
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order processing
    toast.loading('Processing your order...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Your order has been placed successfully!');
      clearCart();
      navigate('/order-confirmation');
    }, 2000);
  };
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <MainLayout title="Checkout | Realism By Khushi" description="Complete your purchase of handcrafted Indian art at Realism By Khushi.">
      <div className="page-container py-12 md:py-16">
        <h1 className="text-3xl font-serif font-medium mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
          {/* Customer information */}
          <div>
            <ContactInformation 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
            
            <ShippingAddress 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleCheckboxChange={handleCheckboxChange}
            />
            
            <PaymentInformation 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
          </div>
          
          {/* Order summary */}
          <div>
            <OrderSummary paymentMethod={formData.paymentMethod} />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Checkout;
