
import React, { useState } from 'react';
import { Users, Search, Edit, Trash2, UserPlus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock customer data
const mockCustomers = [
  { 
    id: '1', 
    name: 'Ananya Sharma', 
    email: 'ananya.sharma@gmail.com', 
    phone: '+91 98765 43210', 
    location: 'Mumbai, Maharashtra', 
    totalOrders: 8,
    totalSpent: '₹24,850',
    lastOrder: '12 Jun 2023'
  },
  { 
    id: '2', 
    name: 'Rajesh Kumar', 
    email: 'rajesh.kumar@outlook.com', 
    phone: '+91 87654 32109', 
    location: 'Bangalore, Karnataka', 
    totalOrders: 5,
    totalSpent: '₹18,200',
    lastOrder: '23 Jul 2023'
  },
  { 
    id: '3', 
    name: 'Priya Patel', 
    email: 'priya.patel@yahoo.com', 
    phone: '+91 76543 21098', 
    location: 'Ahmedabad, Gujarat', 
    totalOrders: 12,
    totalSpent: '₹36,750',
    lastOrder: '05 Aug 2023'
  },
  { 
    id: '4', 
    name: 'Vikram Singh', 
    email: 'vikram.singh@hotmail.com', 
    phone: '+91 65432 10987', 
    location: 'New Delhi, Delhi', 
    totalOrders: 3,
    totalSpent: '₹9,300',
    lastOrder: '18 Aug 2023'
  },
  { 
    id: '5', 
    name: 'Meera Reddy', 
    email: 'meera.reddy@gmail.com', 
    phone: '+91 54321 09876', 
    location: 'Chennai, Tamil Nadu', 
    totalOrders: 7,
    totalSpent: '₹21,500',
    lastOrder: '02 Sep 2023'
  }
];

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    // In a real app, this would navigate to an edit form
    toast.info(`Edit customer: ${customer.name}`);
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
      toast.success(`Customer ${selectedCustomer.name} has been deleted`);
      setIsDeleteModalOpen(false);
      setSelectedCustomer(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-medium">Customers</h1>
        <Button className="bg-primary">
          <UserPlus size={16} className="mr-2" />
          Add New Customer
        </Button>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
        <Input 
          type="search" 
          placeholder="Search customers..." 
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">
          <Search size={16} />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell text-right">Total Orders</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
                  <TableCell className="hidden md:table-cell">{customer.location}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">{customer.totalOrders}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewCustomer(customer)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditCustomer(customer)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(customer)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Customer Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Complete information about this customer.
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Name</Label>
                <div className="col-span-3">{selectedCustomer.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Email</Label>
                <div className="col-span-3">{selectedCustomer.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Phone</Label>
                <div className="col-span-3">{selectedCustomer.phone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Location</Label>
                <div className="col-span-3">{selectedCustomer.location}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Total Orders</Label>
                <div className="col-span-3">{selectedCustomer.totalOrders}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Total Spent</Label>
                <div className="col-span-3">{selectedCustomer.totalSpent}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Last Order</Label>
                <div className="col-span-3">{selectedCustomer.lastOrder}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCustomers;
