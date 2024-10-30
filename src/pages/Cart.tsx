import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Info, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { cartItems, updateQuantity, updateItemDetails, removeFromCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [lineId, setLineId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryTime, setDeliveryTime] = useState<string[]>([]);
  const [oldFurniture, setOldFurniture] = useState('');
  const [disposalMethod, setDisposalMethod] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [total, setTotal] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setAddress(user.address);
      setLineId(user.lineId || '');
    }
  }, [user]);

  useEffect(() => {
    calculateTotal();
  }, [cartItems, discountApplied]);

  const calculateTotal = () => {
    let newTotal = cartItems.reduce((sum, item) => {
      const floorCharge = !item.hasElevator && item.floor > 3 ? (item.floor - 3) * 0.01 * item.price : 0;
      return sum + (item.price + floorCharge) * item.quantity;
    }, 0);

    if (discountApplied) {
      newTotal *= 0.9; // 10% discount
    }

    setTotal(newTotal);
  };

  const handleDeliveryTimeChange = (value: string) => {
    setDeliveryTime(prevTime => 
      prevTime.includes(value)
        ? prevTime.filter(time => time !== value)
        : [...prevTime, value]
    );
  };

  const applyDiscountCode = () => {
    if (discountCode === 'DISCOUNT10') {
      setDiscountApplied(true);
      alert('折扣碼已應用！');
    } else {
      alert('無效的折扣碼');
    }
  };

  const generateOrderNumber = (phone: string) => {
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
                      (now.getMonth() + 1).toString().padStart(2, '0') +
                      now.getDate().toString().padStart(2, '0') +
                      now.getHours().toString().padStart(2, '0') +
                      now.getMinutes().toString().padStart(2, '0');
    return timestamp + phone;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('請先登入會員');
      navigate('/login');
      return;
    }
    
    const newOrderNumber = generateOrderNumber(phone);
    setOrderNumber(newOrderNumber);
    
    const newOrder = {
      id: newOrderNumber,
      items: cartItems,
      customerDetails: { name, phone, address, lineId },
      paymentMethod,
      deliveryTime,
      oldFurniture,
      disposalMethod,
      discountApplied,
      total
    };
    
    addOrder(newOrder);
    setOrderSubmitted(true);
    alert(`訂單已提交！您的訂單編號是：${newOrderNumber}`);
  };

  const handleDownloadImage = async () => {
    if (cartRef.current === null) {
      console.error('Cart reference is null');
      return;
    }

    const canvas = await html2canvas(cartRef.current);
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `order-${orderNumber}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div className="container mx-auto px-4 py-8" ref={cartRef}>
      <h1 className="text-3xl font-bold mb-6">購物車</h1>
      
      {cartItems.map(item => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div>
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">NT$ {item.price.toLocaleString()}</p>
          </div>
          <div className="flex items-center">
            <label className="mr-2">數量:</label>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="w-16 p-1 border rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">樓層:</label>
            <input
              type="number"
              min="1"
              value={item.floor}
              onChange={(e) => updateItemDetails(item.id, { floor: parseInt(e.target.value) })}
              className="w-16 p-1 border rounded"
            />
            <label className="ml-2 flex items-center">
              <input
                type="checkbox"
                checked={item.hasElevator}
                onChange={(e) => updateItemDetails(item.id, { hasElevator: e.target.checked })}
                className="mr-1"
              />
              有電梯
            </label>
            <div className="ml-2 text-gray-500 cursor-pointer group relative">
              <Info size={18} />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 hidden group-hover:block whitespace-nowrap">
                三樓以上且無電梯時，每增加一層加1%
              </div>
            </div>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
            <Trash2 size={20} />
          </button>
        </div>
      ))}

      <div className="mt-6">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="輸入折扣碼"
            className="p-2 border rounded mr-2"
          />
          <button 
            onClick={applyDiscountCode}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            應用
          </button>
        </div>
        {discountApplied && (
          <p className="text-green-600 mb-2">折扣已應用：10% 優惠</p>
        )}
        <p className="text-xl font-bold">總計: NT$ {total.toLocaleString()}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <h2 className="text-2xl font-bold mb-4">訂單資訊</h2>
        
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">收貨人 (必填)</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">電話 (必填)</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2">地址 (必填)</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="lineId" className="block mb-2">LINE ID (選填)</label>
          <input
            type="text"
            id="lineId"
            value={lineId}
            onChange={(e) => setLineId(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">付款方式 (必選)</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="現金"
                checked={paymentMethod === '現金'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                className="mr-2"
              />
              現金
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="轉帳"
                checked={paymentMethod === '轉帳'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                className="mr-2"
              />
              轉帳
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="刷卡"
                checked={paymentMethod === '刷卡'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                className="mr-2"
              />
              刷卡
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">收貨時間 (必選)</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="平日"
                checked={deliveryTime.includes('平日')}
                onChange={() => handleDeliveryTimeChange('平日')}
                className="mr-2"
              />
              平日
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="假日"
                checked={deliveryTime.includes('假日')}
                onChange={() => handleDeliveryTimeChange('假日')}
                className="mr-2"
              />
              假日
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="早上"
                checked={deliveryTime.includes('早上')}
                onChange={() => handleDeliveryTimeChange('早上')}
                className="mr-2"
              />
              早上
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="下午"
                checked={deliveryTime.includes('下午')}
                onChange={() => handleDeliveryTimeChange('下午')}
                className="mr-2"
              />
              下午
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="晚上"
                checked={deliveryTime.includes('晚上')}
                onChange={() => handleDeliveryTimeChange('晚上')}
                className="mr-2"
              />
              晚上
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="oldFurniture" className="block mb-2">需要處理的舊物品項 (必填，若沒有請輸入：無)</label>
          <textarea
            id="oldFurniture"
            value={oldFurniture}
            onChange={(e) => setOldFurniture(e.target.value)}
            required
            className="w-full p-2 border rounded"
            placeholder="若沒有請輸入：無"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">舊物處理方式</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="free"
                checked={disposalMethod === 'free'}
                onChange={(e) => setDisposalMethod(e.target.value)}
                className="mr-2"
              />
              (免費)放置屋外由清潔隊清運
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="paid"
                checked={disposalMethod === 'paid'}
                onChange={(e) => setDisposalMethod(e.target.value)}
                className="mr-2"
              />
              (自費)由送貨人員代清運
            </label>
          </div>
        </div>
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          提交訂單
        </button>
      </form>

      {orderSubmitted && (
        <div className="mt-4">
          <p className="text-green-600">訂單已提交成功！</p>
          <button
            onClick={handleDownloadImage}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
          >
            <Download size={20} className="mr-2" />
            下載訂單圖片
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;