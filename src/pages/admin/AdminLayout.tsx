
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAdminLoggedIn } from '@/services/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminLayout = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if admin is logged in
    if (!isAdminLoggedIn()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AdminSidebar />
          <SidebarInset className="p-2 sm:p-4 md:p-6 overflow-auto w-full">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold">Admin Panel</h1>
              <SidebarTrigger />
            </div>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
