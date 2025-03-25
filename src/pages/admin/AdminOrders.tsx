
import React, { useState } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  Eye, 
  Download, 
  X,
  CheckCircle, 
  TruckIcon, 
  PackageOpen, 
  AlertCircle,
  RefreshCw,
  IndianRupee
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'credit-card' | 'upi' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

const AdminOrders = () => {
  // Sample data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-5267',
      customerName: 'Priya Sharma',
      customerEmail: 'priya.sharma@example.com',
      date: '2023-07-14',
      status: 'delivered',
      paymentMethod: 'credit-card',
      paymentStatus: 'paid',
      shippingAddress: '123 Main St, Mumbai, MH 400001',
      items: [
        {
          productId: 'product-1',
          productName: 'Abstract Landscape Painting',
          productImage: '/placeholder.svg',
          quantity: 1,
          price: 4500
        }
      ],
      subtotal: 4500,
      shippingCost: 0,
      tax: 810,
      total: 5310
    },
    {
      id: 'ORD-5266',
      customerName: 'Raj Patel',
      customerEmail: 'raj.patel@example.com',
      date: '2023-07-13',
      status: 'processing',
      paymentMethod: 'upi',
      paymentStatus: 'paid',
      shippingAddress: '456 Park Ave, Delhi, DL 110001',
      items: [
        {
          productId: 'product-2',
          productName: 'Wooden Sculpture',
          productImage: '/placeholder.svg',
          quantity: 1,
          price: 2800
        }
      ],
      subtotal: 2800,
      shippingCost: 0,
      tax: 504,
      total: 3304
    },
    {
      id: 'ORD-5265',
      customerName: 'Neha Gupta',
      customerEmail: 'neha.gupta@example.com',
      date: '2023-07-12',
      status: 'shipped',
      paymentMethod: 'credit-card',
      paymentStatus: 'paid',
      shippingAddress: '789 Lake View, Bangalore, KA 560001',
      items: [
        {
          productId: 'product-3',
          productName: 'Resin Ocean Wave Art',
          productImage: '/placeholder.svg',
          quantity: 2,
          price: 3600
        }
      ],
      subtotal: 7200,
      shippingCost: 0,
      tax: 1296,
      total: 8496
    },
    {
      id: 'ORD-5264',
      customerName: 'Amit Singh',
      customerEmail: 'amit.singh@example.com',
      date: '2023-07-11',
      status: 'delivered',
      paymentMethod: 'cod',
      paymentStatus: 'paid',
      shippingAddress: '321 River Road, Chennai, TN 600001',
      items: [
        {
          productId: 'product-4',
          productName: 'Traditional Painting',
          productImage: '/placeholder.svg',
          quantity: 1,
          price: 3600
        }
      ],
      subtotal: 3600,
      shippingCost: 50,
      tax: 648,
      total: 4298
    },
    {
      id: 'ORD-5263',
      customerName: 'Sunita Verma',
      customerEmail: 'sunita.verma@example.com',
      date: '2023-07-10',
      status: 'cancelled',
      paymentMethod: 'credit-card',
      paymentStatus: 'failed',
      shippingAddress: '567 Hill Circle, Kolkata, WB 700001',
      items: [
        {
          productId: 'product-5',
          productName: 'Modern Abstract Art',
          productImage: '/placeholder.svg',
          quantity: 1,
          price: 5200
        }
      ],
      subtotal: 5200,
      shippingCost: 0,
      tax: 936,
      total: 6136
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Order>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Filter and sort orders
  const filteredOrders = orders.filter(order => {
    // Search filter
    const searchMatch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === 'all' || order.status === statusFilter;
    
    return searchMatch && statusMatch;
  });
  
  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const handleSort = (field: keyof Order) => {
    setSortDirection(current => 
      sortField === field 
        ? (current === 'asc' ? 'desc' : 'asc') 
        : 'desc'
    );
    setSortField(field);
  };
  
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };
  
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    
    setOrders(updatedOrders);
    toast.success(`Order status updated to ${status}`);
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({...selectedOrder, status});
    }
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-amber-100 text-amber-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <RefreshCw size={14} className="mr-1" />;
      case 'shipped':
        return <TruckIcon size={14} className="mr-1" />;
      case 'delivered':
        return <CheckCircle size={14} className="mr-1" />;
      case 'cancelled':
        return <X size={14} className="mr-1" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const printOrderInvoice = () => {
    toast.success('Invoice downloaded successfully');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-serif font-medium">Orders</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Orders table */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-1 p-0 font-medium"
                  onClick={() => handleSort('id')}
                >
                  Order ID
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-1 p-0 font-medium"
                  onClick={() => handleSort('customerName')}
                >
                  Customer
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-1 p-0 font-medium"
                  onClick={() => handleSort('date')}
                >
                  Date
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-1 p-0 font-medium"
                  onClick={() => handleSort('status')}
                >
                  Status
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-1 p-0 font-medium ml-auto"
                  onClick={() => handleSort('total')}
                >
                  Amount
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.length > 0 ? (
              sortedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p>{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs flex items-center w-fit ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => viewOrderDetails(order)}
                    >
                      <Eye size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No orders found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Order Detail Dialog */}
      <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Order Details: {selectedOrder?.id}</span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={printOrderInvoice}
              >
                <Download size={14} />
                <span>Invoice</span>
              </Button>
            </DialogTitle>
            <DialogDescription>
              Placed on {selectedOrder && formatDate(selectedOrder.date)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6 py-4">
              {/* Status and Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Order Status</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs flex items-center ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                    
                    <Select 
                      value={selectedOrder.status}
                      onValueChange={(value: Order['status']) => updateOrderStatus(selectedOrder.id, value)}
                    >
                      <SelectTrigger className="h-7 text-xs w-36">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="capitalize">{selectedOrder.paymentMethod.replace('-', ' ')}</p>
                </div>
                
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Payment Status</p>
                  <p className="capitalize">
                    {selectedOrder.paymentStatus === 'paid' ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle size={14} className="mr-1" /> 
                        Paid
                      </span>
                    ) : selectedOrder.paymentStatus === 'pending' ? (
                      <span className="text-amber-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> 
                        Pending
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center">
                        <X size={14} className="mr-1" /> 
                        Failed
                      </span>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Customer and Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h3 className="font-medium">Customer Details</h3>
                  <p>{selectedOrder.customerName}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customerEmail}</p>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium">Shipping Address</h3>
                  <p className="text-sm whitespace-pre-line">{selectedOrder.shippingAddress}</p>
                </div>
              </div>
              
              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img 
                                src={item.productImage} 
                                alt={item.productName} 
                                className="w-12 h-12 object-cover rounded"
                              />
                              <span>{item.productName}</span>
                            </div>
                          </TableCell>
                          <TableCell>₹{item.price.toFixed(2)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="space-y-2 ml-auto w-full max-w-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{selectedOrder.shippingCost > 0 ? `₹${selectedOrder.shippingCost.toFixed(2)}` : 'Free'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>₹{selectedOrder.tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="flex items-center">
                      <IndianRupee size={14} className="mr-1" />
                      {selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
