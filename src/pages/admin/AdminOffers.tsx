
import React from 'react';
import { Tag } from 'lucide-react';

const AdminOffers = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-medium">Offers & Promotions</h1>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Tag size={48} className="text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">Offers Management</h2>
        <p className="text-muted-foreground max-w-md">
          This section will allow you to create and manage special offers, discounts, and promotions that will be displayed on your website.
        </p>
      </div>
    </div>
  );
};

export default AdminOffers;
