
import React from 'react';
import { 
  Package, 
  Users, 
  ShoppingBag, 
  IndianRupee,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Sample data for demonstration
const revenueData = [
  { name: 'Jan', revenue: 12400 },
  { name: 'Feb', revenue: 15600 },
  { name: 'Mar', revenue: 18900 },
  { name: 'Apr', revenue: 22000 },
  { name: 'May', revenue: 19800 },
  { name: 'Jun', revenue: 23500 },
  { name: 'Jul', revenue: 34000 },
];

const categoryData = [
  { name: 'Paintings', value: 45 },
  { name: 'Sculptures', value: 30 },
  { name: 'Resin Art', value: 25 },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-medium">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <IndianRupee size={20} className="mr-1" />
              148,000
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12.5%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Orders</CardDescription>
            <CardTitle className="text-2xl">84</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+5.2%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Customers</CardDescription>
            <CardTitle className="text-2xl">68</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+7.8%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Products</CardDescription>
            <CardTitle className="text-2xl">126</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+3.1%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of sales across product categories</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Percentage" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">#ORD-5267</td>
                  <td className="py-2 px-4">Priya Sharma</td>
                  <td className="py-2 px-4">Jul 14, 2023</td>
                  <td className="py-2 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Delivered</span>
                  </td>
                  <td className="py-2 px-4 text-right">₹4,500</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">#ORD-5266</td>
                  <td className="py-2 px-4">Raj Patel</td>
                  <td className="py-2 px-4">Jul 13, 2023</td>
                  <td className="py-2 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Processing</span>
                  </td>
                  <td className="py-2 px-4 text-right">₹2,800</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">#ORD-5265</td>
                  <td className="py-2 px-4">Neha Gupta</td>
                  <td className="py-2 px-4">Jul 12, 2023</td>
                  <td className="py-2 px-4">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">Shipped</span>
                  </td>
                  <td className="py-2 px-4 text-right">₹7,200</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">#ORD-5264</td>
                  <td className="py-2 px-4">Amit Singh</td>
                  <td className="py-2 px-4">Jul 11, 2023</td>
                  <td className="py-2 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Delivered</span>
                  </td>
                  <td className="py-2 px-4 text-right">₹3,600</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">#ORD-5263</td>
                  <td className="py-2 px-4">Sunita Verma</td>
                  <td className="py-2 px-4">Jul 10, 2023</td>
                  <td className="py-2 px-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Cancelled</span>
                  </td>
                  <td className="py-2 px-4 text-right">₹5,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
