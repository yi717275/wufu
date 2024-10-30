import React from 'react';
import { MapPin, Phone, MessageCircle, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-smooth mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-600">五福傢俱</h2>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600">
                <MessageCircle className="w-5 h-5 mr-3 text-primary-500" />
                LINE ID: wuminkung
              </p>
              <p className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-primary-500" />
                台中市清水區鰲峰路695號
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3 text-primary-500" />
                (04) 2622-2747
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">關於我們</h3>
            <p className="text-gray-600 leading-relaxed">
              我們深耕台中海線在地，經營超過45個年頭。致力於提供高品質、舒適的家具，為您打造溫馨的家居環境。
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">營業時間</h3>
            <div className="space-y-2 text-gray-600">
              <p>週一至週五：9:00 - 18:00</p>
              <p>週六至週日：10:00 - 17:00</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} 五福傢俱. All rights reserved.
            </p>
            <Link 
              to="/admin-login" 
              className="text-gray-400 hover:text-primary-500 transition duration-300"
              aria-label="管理員登入"
            >
              <Leaf className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;