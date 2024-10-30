import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  name: string;
  phone: string;
  address: string;
  lineId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<void>;
  register: (name: string, phone: string, password: string, address: string, lineId?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (phone: string, password: string) => {
    // 這裡應該是與後端 API 進行驗證的邏輯
    // 現在我們只是模擬一個成功的登入
    setUser({ name: 'Test User', phone, address: 'Test Address' });
  };

  const register = async (name: string, phone: string, password: string, address: string, lineId?: string) => {
    // 這裡應該是與後端 API 進行註冊的邏輯
    // 現在我們只是模擬一個成功的註冊
    setUser({ name, phone, address, lineId });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};