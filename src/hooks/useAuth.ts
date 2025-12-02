import { useState } from 'react';
import { User } from '../types';
import { mockUser } from '../mocks/data';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (phone: string) => {
    setUser({ ...mockUser, phone });
  };

  const verifyOTP = (otp: string) => {
    return otp.length === 4 || otp.length === 6;
  };

  const updateKYC = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    verifyOTP,
    updateKYC,
    logout,
  };
};
