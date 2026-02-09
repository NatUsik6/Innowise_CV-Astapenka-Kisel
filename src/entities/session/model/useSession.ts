'use client';

import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export type UserRole = 'Admin' | 'Employee';

interface DecodedToken {
  sub?: string | number;
  email?: string;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  [key: string]: any;
}

export const useSession = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    const token = Cookies.get('access_token');
    
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        
        const decoded: DecodedToken = JSON.parse(jsonPayload);

        const userData = {
          id: String(decoded.sub || ''),
          email: decoded.email || '',
          role: decoded.role || 'Employee',
          firstName: decoded.firstName || decoded.first_name || '',
          lastName: decoded.lastName || decoded.last_name || '',
        };
        
        setUser(userData);
        
      } catch (err) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
      }
    }
  }, []);
  
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/';

  if (isAuthPage) {
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }

  if (!isClient) {
    return {
      user: null,
      isAuthenticated: false,
      loading: true,
      error: null,
    };
  }

  return {
    user,
    isAuthenticated: !!user,
    loading: false,
    error: null,
  };
};