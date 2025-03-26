
import { supabase } from '@/integrations/supabase/client';
import { Admin } from '@/types/supabase';

// Admin session storage keys
const ADMIN_SESSION_KEY = 'admin_session';

// Check if an admin is logged in
export const isAdminLoggedIn = (): boolean => {
  const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!sessionData) return false;
  
  try {
    const session = JSON.parse(sessionData);
    // Check if the session has expired
    const expiryTime = new Date(session.expiresAt).getTime();
    if (Date.now() > expiryTime) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error parsing admin session:', error);
    return false;
  }
};

// Login an admin
export const loginAdmin = async (username: string, password: string): Promise<Admin | null> => {
  try {
    // In a real application, you would use Supabase Auth
    // This is a simplified example with direct DB access and no proper password hashing
    const { data, error } = await supabase
      .from('admins')
      .select('id, username, created_at')
      .eq('username', username)
      .single();
    
    if (error) throw error;
    if (!data) return null;
    
    // Store admin session
    const session = {
      admin: data,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    };
    
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

// Logout an admin
export const logoutAdmin = (): void => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

// Get the current admin data
export const getCurrentAdmin = (): Admin | null => {
  if (!isAdminLoggedIn()) return null;
  
  try {
    const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!sessionData) return null;
    
    const { admin } = JSON.parse(sessionData);
    return admin;
  } catch (error) {
    console.error('Error getting current admin:', error);
    return null;
  }
};
