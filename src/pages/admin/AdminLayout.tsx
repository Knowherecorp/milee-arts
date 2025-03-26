
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAdminLoggedIn } from '@/services/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from 'sonner';

const AdminLayout = () => {
  const navigate = useNavigate();

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
        <div className="flex h-screen w-full">
          <AdminSidebar />
          <SidebarInset className="p-4 md:p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Admin Management</h1>
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
