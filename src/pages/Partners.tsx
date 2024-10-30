import React from 'react';
import { ArrowRight } from 'lucide-react';

const partners = [
  { id: 1, name: '優質木材供應商', logo: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', description: '提供高品質、環保的木材，是我們傢俱製作的重要夥伴。', website: 'https://example.com/wood-supplier' },
  { id: 2, name: '創新設計工作室', logo: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', description: '為我們的傢俱帶來現代感和獨特性，讓每件作品都成為藝術品。', website: 'https://example.com/design-studio' },
  { id: 3, name: '環保包裝公司', logo: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', description: '使用可回收材料，確保我們的產品運輸過程中的安全和環保。', website: 'https://example.com/eco-packaging' },
  { id: 4, name: '智能家居科技公司', logo: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', description: '為我們的傢俱添加智能功能，提升客戶的生活品質。', website: 'https://example.com/smart-home-tech' },
];

const Partners: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-800">異業結盟</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {partners.map(partner => (
          <div key={partner.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4">
              <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-cover rounded-full mr-4" />
              <h2 className="text-2xl font-semibold text-primary-700">{partner.name}</h2>
            </div>
            <p className="text-gray-600 mb-4">{partner.description}</p>
            <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 flex items-center">
              了解更多 <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        ))}
      </div>

      <section className="bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-primary-800">合作方式</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-primary-700">合作條件</h3>
          <p className="text-gray-600 mb-4">我們歡迎各行各業的優質企業加入我們的異業結盟計劃。合作夥伴需具備以下條件：</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>擁有良好的商業信譽和穩定的經營狀況</li>
            <li>提供高品質的產品或服務</li>
            <li>具有創新精神和環保意識</li>
            <li>願意與我們共同為客戶創造價值</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-primary-700">收益分享模式</h3>
          <p className="text-gray-600 mb-4">我們採用靈活的收益分享模式，根據合作項目的性質和規模，制定公平合理的分潤方案。具體包括：</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>銷售佣金：根據銷售額的一定比例進行分成</li>
            <li>固定費用：針對特定服務或產品支付固定金額</li>
            <li>利潤分成：按照項目淨利潤的約定比例進行分配</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary-700">申請流程</h3>
          <ol className="list-decimal list-inside text-gray-600">
            <li>填寫合作意向表單</li>
            <li>初步審核和評估</li>
            <li>商務洽談和方案制定</li>
            <li>簽署合作協議</li>
            <li>開始合作</li>
          </ol>
        </div>
      </section>

      <div className="mt-12 text-center">
        <p className="text-xl font-semibold text-primary-800 mb-4">如果您對我們的異業結盟計劃感興趣，請與管理人員聯繫。</p>
        <p className="text-lg text-gray-600">我們期待與您攜手共創美好未來！</p>
      </div>
    </div>
  );
};

export default Partners;