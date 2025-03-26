import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Users, Package, DollarSign, Tags, ImageIcon } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              Connect to your data source
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Connect to your data source
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Connect to your data source
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Connect to your data source
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-muted-foreground">
              No orders yet. They will appear here when customers place them.
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-muted-foreground">
              No product data available yet. Add products and track their performance.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Add Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Start by adding products to your inventory using the Products section.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Tags className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Create Categories</h3>
                  <p className="text-sm text-muted-foreground">
                    Organize your products by creating categories to improve navigation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <ImageIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Set Up Banners</h3>
                  <p className="text-sm text-muted-foreground">
                    Create promotional banners to highlight special offers and new products.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
