import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, LogOut, ChevronDown, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-smooth">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition duration-300">
            五福傢俱
          </Link>
          
          <div className="hidden md:block text-gray-600">
            {formatDate(currentTime)}
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition duration-300">首頁</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition duration-300">產品</Link>
            <Link to="/partners" className="text-gray-700 hover:text-primary-600 transition duration-300">異業結盟</Link>
            
            <Link to="/cart" className="text-gray-700 hover:text-primary-600 transition duration-300">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-primary-600 transition duration-300"
                >
                  <User className="w-6 h-6 mr-2" />
                  <span>{user.name}</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-hover py-2">
                    <Link
                      to="/member-orders"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      我的訂單
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      登出
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary-600 transition duration-300">
                <User className="w-6 h-6" />
              </Link>
            )}
          </nav>
          
          <button 
            className="md:hidden text-gray-700 hover:text-primary-600 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary-600 transition duration-300">首頁</Link>
            <Link to="/products" className="block py-2 text-gray-700 hover:text-primary-600 transition duration-300">產品</Link>
            <Link to="/partners" className="block py-2 text-gray-700 hover:text-primary-600 transition duration-300">異業結盟</Link>
            <Link to="/cart" className="block py-2 text-gray-700 hover:text-primary-600 transition duration-300">購物車</Link>
            {user ? (
              <>
                <Link to="/member-orders" className="block py-2 text-gray-700 hover:text-primary-600 transition duration-300">我的訂單</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:text-primary-600 transition duration-300"
                >
                  登出
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2 text-gray-700 hover:text-primary-600 transition duration-300">登入</Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;