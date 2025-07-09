import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderConfirmationPage from '../OrderConfirmation/OrderConfirmationPage';

const PurchasePage = ({ userId }) => {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/items-of-the-day')
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.error('Failed fetch items:', err);
        alert('Failed to load items.');
      });
  }, []);

  const addToCart = () => {
    const item = items.find((i) => i.id === +selectedId);
    if (!item) return alert('Select an item');
    if (qty < 1 || qty > item.quantity) 
    {
      return alert('The quantity present in the inventory is less then your demand. Please Select less Quantity');
    }
    setCart((prev) => [
      ...prev,
      { ...item, quantity: qty, total: item.price * qty },
    ]);
    setSelectedId('');
    setQty(1);
  };

  const totalAmount = cart.reduce((sum, i) => sum + i.total, 0);

  const confirmPurchase = () => {
    axios
      .post('http://localhost:3000/api/orders', { userId: userId, items: cart })
      .then((res) => {
        setOrder({ orderId: res.data.orderId, total: res.data.total, items: cart });
      })
      .catch((err) => {
        console.error('Order failed:', err.response?.data || err.message);
        alert('Order failed.');
      });
  };

  if (order) {
    return <OrderConfirmationPage order={order} />;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Purchase Items</h2>

      <div className="flex gap-2 mb-4">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="border p-2 flex-1"
        >
          <option value="">Select item</option>
          {items.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name} – ₹{i.price}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(+e.target.value)}
          className="w-20 border p-2"
        />
        <button onClick={addToCart} className="bg-blue-500 text-white px-4 rounded">
          Add
        </button>
      </div>

      {cart.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full mb-4 text-left">
            <thead>
              <tr>
                <th className="p-1">Item</th>
                <th className="p-1">Qty</th>
                <th className="p-1">Price (₹)</th>
                <th className="p-1">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((it, idx) => (
                <tr key={idx}>
                  <td className="p-1">{it.name}</td>
                  <td className="p-1">{it.quantity}</td>
                  <td className="p-1">{it.price}</td>
                  <td className="p-1">{it.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right font-semibold mb-4">
            Total: ₹{totalAmount}
          </div>
          <button
            onClick={confirmPurchase}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Confirm Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default PurchasePage;
