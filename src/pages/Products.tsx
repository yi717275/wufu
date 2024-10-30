import React, { useState, useEffect } from 'react';
import { Search, SortAsc, SortDesc, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart, CartItem } from '../contexts/CartContext';

// Mock product data (增加更多產品以測試分頁)
const mockProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `產品 ${i + 1}`,
  category: ['客廳', '餐廳', '臥室', '書房'][Math.floor(Math.random() * 4)],
  price: Math.floor(Math.random() * 20000) + 5000,
  image: `https://source.unsplash.com/featured/?furniture&${i}`,
  description: '高品質傢俱，舒適耐用'
}));

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  const { addToCart } = useCart();

  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (minPrice === '' || product.price >= parseInt(minPrice)) &&
    (maxPrice === '' || product.price <= parseInt(maxPrice))
  ).sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice, sortOrder]);

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      floor: 1,
      hasElevator: false
    };
    addToCart(cartItem);
    alert(`已將 ${product.name} 加入購物車`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-800">我們的產品</h1>
      
      {/* ... (保留搜索和排序功能) ... */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 animate-fadeIn">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-primary-800">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-primary-600">NT$ {product.price.toLocaleString()}</p>
                <button 
                  className="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition duration-300 flex items-center"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ... (保留分頁功能) ... */}
    </div>
  );
};

export default Products;