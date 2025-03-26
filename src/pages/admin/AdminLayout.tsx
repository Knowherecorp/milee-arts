
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAdminLoggedIn } from '@/services/auth';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    if (!isAdminLoggedIn()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return <Outlet />;
};

export default AdminLayout;
