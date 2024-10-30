import React, { useState, useRef, useEffect } from 'react';
import { Edit, Save, X, Plus, Minus, Download, Trash2 } from 'lucide-react';
import { useOrders, Order, OrderItem } from '../contexts/OrderContext';
import html2canvas from 'html2canvas';

const AdminDashboard: React.FC = () => {
  const { orders, updateOrder, deleteOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editMode, setEditMode] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);
  const [newItem, setNewItem] = useState<OrderItem>({
    id: 0,
    name: '',
    price: 0,
    quantity: 1,
    floor: 1,
    hasElevator: false
  });

  const calculateTotal = (items: OrderItem[], discountApplied: boolean) => {
    let total = items.reduce((sum, item) => {
      const floorCharge = !item.hasElevator && item.floor > 3 ? (item.floor - 3) * 0.01 * item.price : 0;
      return sum + (item.price + floorCharge) * item.quantity;
    }, 0);

    if (discountApplied) {
      total *= 0.9; // 10% discount
    }

    return total;
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditMode(false);
  };

  const handleEditOrder = () => {
    setEditMode(true);
  };

  const handleSaveOrder = () => {
    if (selectedOrder) {
      const updatedOrder = {
        ...selectedOrder,
        total: calculateTotal(selectedOrder.items, selectedOrder.discountApplied)
      };
      updateOrder(updatedOrder);
      setSelectedOrder(updatedOrder);
      setEditMode(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    if (selectedOrder) {
      const originalOrder = orders.find(order => order.id === selectedOrder.id);
      if (originalOrder) {
        setSelectedOrder(originalOrder);
      }
    }
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: any) => {
    if (selectedOrder) {
      const updatedItems = [...selectedOrder.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      const updatedOrder = { 
        ...selectedOrder, 
        items: updatedItems,
        total: calculateTotal(updatedItems, selectedOrder.discountApplied)
      };
      setSelectedOrder(updatedOrder);
    }
  };

  const handleOrderInfoChange = (field: keyof Order, value: any) => {
    if (selectedOrder) {
      const updatedOrder = { 
        ...selectedOrder, 
        [field]: value,
        total: field === 'discountApplied' 
          ? calculateTotal(selectedOrder.items, value as boolean)
          : selectedOrder.total
      };
      setSelectedOrder(updatedOrder);
    }
  };

  const handleAddItem = () => {
    if (selectedOrder && newItem.name && newItem.price > 0) {
      const updatedItems = [...selectedOrder.items, { ...newItem, id: Date.now() }];
      const updatedOrder = {
        ...selectedOrder,
        items: updatedItems,
        total: calculateTotal(updatedItems, selectedOrder.discountApplied)
      };
      setSelectedOrder(updatedOrder);
      setNewItem({ id: 0, name: '', price: 0, quantity: 1, floor: 1, hasElevator: false });
    }
  };

  const handleRemoveItem = (itemId: number) => {
    if (selectedOrder) {
      const updatedItems = selectedOrder.items.filter(item => item.id !== itemId);
      const updatedOrder = {
        ...selectedOrder,
        items: updatedItems,
        total: calculateTotal(updatedItems, selectedOrder.discountApplied)
      };
      setSelectedOrder(updatedOrder);
    }
  };

  const handleDownloadImage = async () => {
    if (orderRef.current === null) {
      console.error('Order reference is null');
      return;
    }

    const canvas = await html2canvas(orderRef.current);
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `order-${selectedOrder?.id}.png`;
    link.href = image;
    link.click();
  };

  const getChineseDisposalMethod = (method: string) => {
    switch (method) {
      case 'free':
        return '(免費)放置屋外由清潔隊清運';
      case 'paid':
        return '(自費)由送貨人員代清運';
      default:
        return method;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">管理員儀表板</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">訂單列表</h2>
          <ul className="space-y-2">
            {orders.map(order => (
              <li 
                key={order.id} 
                className={`cursor-pointer p-2 rounded ${selectedOrder?.id === order.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => handleSelectOrder(order)}
              >
                訂單 #{order.id}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="col-span-2">
          {selectedOrder ? (
            <div ref={orderRef}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">訂單詳情 #{selectedOrder.id}</h2>
                <div>
                  {editMode ? (
                    <>
                      <button onClick={handleSaveOrder} className="mr-2 text-green-500"><Save size={20} /></button>
                      <button onClick={handleCancelEdit} className="text-red-500"><X size={20} /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleEditOrder} className="mr-2 text-blue-500"><Edit size={20} /></button>
                      <button onClick={handleDownloadImage} className="text-green-500"><Download size={20} /></button>
                    </>
                  )}
                </div>
              </div>
              
              <ul className="space-y-2 mb-4">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="w-1/4">{item.name}</span>
                    <span className="w-1/6">NT$ {item.price.toLocaleString()}</span>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                      disabled={!editMode}
                      className="w-16 p-1 border rounded"
                    />
                    <input
                      type="number"
                      value={item.floor}
                      onChange={(e) => handleItemChange(index, 'floor', parseInt(e.target.value))}
                      disabled={!editMode}
                      className="w-16 p-1 border rounded"
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.hasElevator}
                        onChange={(e) => handleItemChange(index, 'hasElevator', e.target.checked)}
                        disabled={!editMode}
                        className="mr-2"
                      />
                      有電梯
                    </label>
                    {editMode && (
                      <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">
                        <Trash2 size={20} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              
              {editMode && (
                <div className="mb-4 p-4 border rounded">
                  <h4 className="font-semibold mb-2">新增商品</h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="商品名稱"
                      className="flex-grow p-1 border rounded"
                    />
                    <input
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) })}
                      placeholder="價格"
                      className="w-24 p-1 border rounded"
                    />
                    <button onClick={handleAddItem} className="bg-green-500 text-white px-4 py-2 rounded">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-semibold mb-2">訂單資訊</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block">付款方式:</label>
                    {editMode ? (
                      <select
                        value={selectedOrder.paymentMethod}
                        onChange={(e) => handleOrderInfoChange('paymentMethod', e.target.value)}
                        className="w-full p-1 border rounded"
                      >
                        <option value="現金">現金</option>
                        <option value="轉帳">轉帳</option>
                        <option value="刷卡">刷卡</option>
                      </select>
                    ) : (
                      <p>{selectedOrder.paymentMethod}</p>
                    )}
                  </div>
                  <div>
                    <label className="block">配送時間:</label>
                    {editMode ? (
                      <div className="flex flex-wrap gap-2">
                        {['平日', '假日', '早上', '下午', '晚上'].map((time) => (
                          <label key={time} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedOrder.deliveryTime.includes(time)}
                              onChange={(e) => {
                                const updatedTimes = e.target.checked
                                  ? [...selectedOrder.deliveryTime, time]
                                  : selectedOrder.deliveryTime.filter(t => t !== time);
                                handleOrderInfoChange('deliveryTime', updatedTimes);
                              }}
                              className="mr-1"
                            />
                            {time}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p>{selectedOrder.deliveryTime.join(', ')}</p>
                    )}
                  </div>
                  <div>
                    <label className="block">舊物品:</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={selectedOrder.oldFurniture}
                        onChange={(e) => handleOrderInfoChange('oldFurniture', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      <p>{selectedOrder.oldFurniture}</p>
                    )}
                  </div>
                  <div>
                    <label className="block">處理方式:</label>
                    {editMode ? (
                      <select
                        value={selectedOrder.disposalMethod}
                        onChange={(e) => handleOrderInfoChange('disposalMethod', e.target.value)}
                        className="w-full p-1 border rounded"
                      >
                        <option value="free">(免費)放置屋外由清潔隊清運</option>
                        <option value="paid">(自費)由送貨人員代清運</option>
                      </select>
                    ) : (
                      <p>{getChineseDisposalMethod(selectedOrder.disposalMethod)}</p>
                    )}
                  </div>
                  <div>
                    <label className="block">折扣應用:</label>
                    {editMode ? (
                      <input
                        type="checkbox"
                        checked={selectedOrder.discountApplied}
                        onChange={(e) => handleOrderInfoChange('discountApplied', e.target.checked)}
                        className="mr-2"
                      />
                    ) : (
                      <p>{selectedOrder.discountApplied ? '是' : '否'}</p>
                    )}
                  </div>
                  <p className="font-bold">總計: NT$ {selectedOrder.total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>請選擇一個訂單查看詳情</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;