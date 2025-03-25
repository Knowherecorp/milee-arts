
import React from 'react';
import { Image } from 'lucide-react';

const AdminBanners = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-medium">Banner Management</h1>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Image size={48} className="text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">Banner Management</h2>
        <p className="text-muted-foreground max-w-md">
          This section will allow you to manage the sliding banner images on your homepage, including uploading new images, arranging their order, and setting links.
        </p>
      </div>
    </div>
  );
};

export default AdminBanners;
