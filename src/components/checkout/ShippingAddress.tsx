
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ShippingAddressProps {
  formData: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    saveInfo: boolean;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

const ShippingAddress = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleCheckboxChange 
}: ShippingAddressProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-serif font-medium mb-4">Shipping Address</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select 
              value={formData.state} 
              onValueChange={(value) => handleSelectChange('state', value)}
            >
              <SelectTrigger id="state">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AP">Andhra Pradesh</SelectItem>
                <SelectItem value="AR">Arunachal Pradesh</SelectItem>
                <SelectItem value="AS">Assam</SelectItem>
                <SelectItem value="BR">Bihar</SelectItem>
                <SelectItem value="CG">Chhattisgarh</SelectItem>
                <SelectItem value="GA">Goa</SelectItem>
                <SelectItem value="GJ">Gujarat</SelectItem>
                <SelectItem value="HR">Haryana</SelectItem>
                <SelectItem value="HP">Himachal Pradesh</SelectItem>
                <SelectItem value="JH">Jharkhand</SelectItem>
                <SelectItem value="KA">Karnataka</SelectItem>
                <SelectItem value="KL">Kerala</SelectItem>
                <SelectItem value="MP">Madhya Pradesh</SelectItem>
                <SelectItem value="MH">Maharashtra</SelectItem>
                <SelectItem value="MN">Manipur</SelectItem>
                <SelectItem value="ML">Meghalaya</SelectItem>
                <SelectItem value="MZ">Mizoram</SelectItem>
                <SelectItem value="NL">Nagaland</SelectItem>
                <SelectItem value="OR">Odisha</SelectItem>
                <SelectItem value="PB">Punjab</SelectItem>
                <SelectItem value="RJ">Rajasthan</SelectItem>
                <SelectItem value="SK">Sikkim</SelectItem>
                <SelectItem value="TN">Tamil Nadu</SelectItem>
                <SelectItem value="TG">Telangana</SelectItem>
                <SelectItem value="TR">Tripura</SelectItem>
                <SelectItem value="UK">Uttarakhand</SelectItem>
                <SelectItem value="UP">Uttar Pradesh</SelectItem>
                <SelectItem value="WB">West Bengal</SelectItem>
                <SelectItem value="DL">Delhi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">PIN Code</Label>
            <Input 
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select 
              value={formData.country} 
              onValueChange={(value) => handleSelectChange('country', value)}
            >
              <SelectTrigger id="country">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IN">India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="saveInfo" 
            checked={formData.saveInfo}
            onCheckedChange={(checked) => 
              handleCheckboxChange('saveInfo', checked as boolean)
            }
          />
          <Label htmlFor="saveInfo" className="text-sm text-muted-foreground">
            Save this information for next time
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
