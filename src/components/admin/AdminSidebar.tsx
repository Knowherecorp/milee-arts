
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingCart, 
  Users, 
  ImageIcon, 
  Ticket, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutAdmin } from '@/services/auth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      title: 'Products',
      path: '/admin/products',
      icon: Package,
    },
    {
      title: 'Categories',
      path: '/admin/categories',
      icon: Tags,
    },
    {
      title: 'Orders',
      path: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      title: 'Customers',
      path: '/admin/customers',
      icon: Users,
    },
    {
      title: 'Banners',
      path: '/admin/banners',
      icon: ImageIcon,
    },
    {
      title: 'Offers',
      path: '/admin/offers',
      icon: Ticket,
    },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname === path || 
           (path !== '/admin' && location.pathname.startsWith(path));
  };

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-2">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    isActive={isActive(item.path)}
                    onClick={() => navigate(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-start px-2" 
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
