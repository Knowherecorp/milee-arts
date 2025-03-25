
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PaymentInformationProps {
  formData: {
    paymentMethod: string;
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    upiId: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const PaymentInformation = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange 
}: PaymentInformationProps) => {
  return (
    <div>
      <h2 className="text-xl font-serif font-medium mb-4">Payment Information</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button
              type="button"
              variant={formData.paymentMethod === 'credit-card' ? 'default' : 'outline'}
              className="justify-start"
              onClick={() => handleSelectChange('paymentMethod', 'credit-card')}
            >
              Credit/Debit Card
            </Button>
            <Button
              type="button"
              variant={formData.paymentMethod === 'upi' ? 'default' : 'outline'}
              className="justify-start"
              onClick={() => handleSelectChange('paymentMethod', 'upi')}
            >
              UPI
            </Button>
            <Button
              type="button"
              variant={formData.paymentMethod === 'cod' ? 'default' : 'outline'}
              className="justify-start"
              onClick={() => handleSelectChange('paymentMethod', 'cod')}
            >
              Cash on Delivery
            </Button>
          </div>
        </div>
        
        {formData.paymentMethod === 'credit-card' && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input 
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        )}
        
        {formData.paymentMethod === 'upi' && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input 
                id="upiId"
                name="upiId"
                placeholder="name@upi"
                value={formData.upiId}
                onChange={handleInputChange}
                required
              />
            </div>
            <p className="text-sm text-muted-foreground">
              You will be redirected to your UPI app to complete the payment.
            </p>
          </div>
        )}
        
        {formData.paymentMethod === 'cod' && (
          <div className="bg-secondary/20 p-4 rounded-md">
            <p className="text-sm">
              Pay in cash when your order is delivered. Additional ₹50 fee applies for Cash on Delivery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInformation;
