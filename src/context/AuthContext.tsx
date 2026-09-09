import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginWithGoogle: (email?: string, name?: string) => Promise<boolean>;
  sendMobileOtp: (mobile: string) => Promise<{ success: boolean; otp?: string; message: string }>;
  verifyMobileOtp: (mobile: string, otp: string) => Promise<boolean>;
  loginAsAdmin: (password?: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  savedDestinations: string[];
  toggleWishlist: (destinationId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_DEFAULT_USER: User = {
  id: 'usr-soumodip',
  name: 'Soumodip Chal',
  email: 'soumodipchal@gmail.com',
  phone: '+91 98301 22345',
  role: 'user',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  memberSince: 'March 2025',
  completedTripsCount: 4,
  savedDestinations: ['lepchajagat', 'mousuni-island', 'garhpanchkot-baranti'],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('routex_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_DEFAULT_USER;
      }
    }
    return DEMO_DEFAULT_USER; // Start with logged in traveler for smooth startup MVP demonstration
  });

  const [generatedOtps, setGeneratedOtps] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      localStorage.setItem('routex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('routex_user');
    }
  }, [user]);

  const loginWithGoogle = async (customEmail?: string, customName?: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr-g-${Date.now()}`,
      name: customName || 'Soumodip Chal',
      email: customEmail || 'soumodipchal@gmail.com',
      phone: '+91 98301 22345',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      memberSince: 'September 2026',
      completedTripsCount: 0,
      savedDestinations: user?.savedDestinations || ['lepchajagat'],
    };
    setUser(newUser);
    return true;
  };

  const sendMobileOtp = async (mobile: string) => {
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      return { success: false, message: 'Please enter a valid 10-digit Indian mobile number.' };
    }
    // Generate deterministic 6-digit OTP for testing convenience
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtps(prev => ({ ...prev, [cleanMobile]: otp }));
    return {
      success: true,
      otp,
      message: `OTP sent to +91 ${cleanMobile.slice(-10)}. For demo verification, use code: ${otp}`,
    };
  };

  const verifyMobileOtp = async (mobile: string, enteredOtp: string): Promise<boolean> => {
    const cleanMobile = mobile.replace(/\D/g, '');
    const validOtp = generatedOtps[cleanMobile] || '123456';
    if (enteredOtp === validOtp || enteredOtp === '123456') {
      const newUser: User = {
        id: `usr-m-${Date.now()}`,
        name: user?.name || `Traveler ${cleanMobile.slice(-4)}`,
        email: user?.email || `traveler${cleanMobile.slice(-4)}@routex.in`,
        phone: `+91 ${cleanMobile.slice(-10)}`,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        memberSince: 'September 2026',
        completedTripsCount: 1,
        savedDestinations: user?.savedDestinations || ['takdah-tinchuley'],
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const loginAsAdmin = (password?: string): boolean => {
    // Demo admin check
    const adminUser: User = {
      id: 'usr-admin-root',
      name: 'RouteX Administrator',
      email: 'admin@routex.in',
      phone: '+91 33 2212 9000',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      memberSince: 'January 2025',
      completedTripsCount: 15,
      savedDestinations: [],
    };
    setUser(adminUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const toggleWishlist = (destinationId: string) => {
    if (!user) return;
    const current = user.savedDestinations || [];
    const exists = current.includes(destinationId);
    const updated = exists
      ? current.filter(id => id !== destinationId)
      : [...current, destinationId];
    setUser({ ...user, savedDestinations: updated });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loginWithGoogle,
        sendMobileOtp,
        verifyMobileOtp,
        loginAsAdmin,
        logout,
        updateProfile,
        savedDestinations: user?.savedDestinations || [],
        toggleWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
