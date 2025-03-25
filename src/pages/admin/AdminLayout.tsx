
import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Image, 
  Tag, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  // Check if user is authenticated
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth');
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // For mobile, close sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const navItems = [
    { title: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { title: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { title: 'Categories', path: '/admin/categories', icon: <Layers size={20} /> },
    { title: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} /> },
    { title: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
    { title: 'Banners', path: '/admin/banners', icon: <Image size={20} /> },
    { title: 'Offers', path: '/admin/offers', icon: <Tag size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-secondary/10">
      <Helmet>
        <title>Admin Dashboard | Realism By Khushi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* Mobile header */}
      <header className="md:hidden bg-white shadow-sm py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={toggleSidebar} size="icon">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <h1 className="text-xl font-serif ml-2">Admin Panel</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut size={20} />
        </Button>
      </header>
      
      <div className="flex h-[calc(100vh-4rem)] md:h-screen">
        {/* Sidebar */}
        <aside 
          className={`fixed md:sticky top-0 left-0 z-40 h-full w-64 bg-white border-r transform transition-transform duration-200 md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b">
            <h1 className="text-xl font-serif">Realism By Khushi</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
          
          <nav className="p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors hover:bg-secondary/50 ${
                      location.pathname === item.path ? 'bg-secondary text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="absolute bottom-0 w-full p-4 border-t">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {sidebarOpen && isMobile && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={toggleSidebar}
            />
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
