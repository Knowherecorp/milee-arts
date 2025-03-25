
import React from 'react';
import { Users } from 'lucide-react';

const AdminCustomers = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-medium">Customers</h1>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Users size={48} className="text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">Customer Management</h2>
        <p className="text-muted-foreground max-w-md">
          This section will contain the customer management functionality, allowing you to view and manage customer accounts, track order history, and more.
        </p>
      </div>
    </div>
  );
};

export default AdminCustomers;
