
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDirectAccess, setIsDirectAccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if admin is already logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth');
    if (isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  // Check if the user is accessing the admin login directly from URL
  useEffect(() => {
    const referrer = document.referrer;
    // If no referrer or referrer is from an external site (not our domain)
    if (!referrer || !referrer.includes(window.location.hostname)) {
      setIsDirectAccess(true);
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For demo purposes, hardcoded credentials
    if (username === 'admin' && password === 'admin123') {
      // Set admin auth in localStorage (in a real app, use JWT tokens)
      localStorage.setItem('adminAuth', 'true');
      
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Logged in successfully');
        navigate('/admin');
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast.error('Invalid credentials');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <Helmet>
        <title>Admin Login | Realism By Khushi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
          {isDirectAccess && (
            <p className="text-sm text-amber-600 mt-2">
              Note: Admin credentials for demo purposes: 
              <br />Username: admin, Password: admin123
            </p>
          )}
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                  <User size={18} />
                </div>
                <Input 
                  id="username" 
                  type="text" 
                  className="pl-9"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                  <Lock size={18} />
                </div>
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
