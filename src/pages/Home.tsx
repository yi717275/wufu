import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const promotions = [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  ];

  const features = [
    { title: '優質材料', description: '精選高品質木材和布料，確保耐用性和舒適度。' },
    { title: '客製化設計', description: '根據您的需求和喜好，打造獨一無二的傢俱。' },
    { title: '專業配送', description: '細心包裝，安全送達，並提供安裝服務。' },
    { title: '售後保障', description: '購買後享有完善的保固服務，讓您安心使用。' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary-800">歡迎來到五福傢俱</h1>
      
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        className="mb-12"
      >
        {promotions.map((url, index) => (
          <div key={index} className="relative">
            <img src={url} alt={`Promotion ${index + 1}`} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">精選促銷 {index + 1}</h2>
            </div>
          </div>
        ))}
      </Carousel>

      <section className="mt-12 mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center text-primary-800">為什麼選擇五福傢俱？</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-primary-700">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-primary-50 p-8 rounded-lg shadow-md animate-fadeIn">
        <h2 className="text-3xl font-semibold mb-6 text-center text-primary-800">探索我們的產品</h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
          五福傢俱提供多樣化的家具選擇，從客廳到臥室，我們都有適合您的優質傢俱。
        </p>
        <div className="text-center">
          <Link to="/products" className="inline-block mt-4 bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition duration-300 flex items-center justify-center mx-auto">
            瀏覽所有產品
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;