import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderConfirmationPage from '../OrderConfirmation/OrderConfirmationPage';
import { PlusCircle, Trash2 } from 'lucide-react';

const BuyThroughAdmin = () => {
  const [items, setItems] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [filter, setFilter] = useState('');
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/items-of-the-day')
      .then(res => setItems(res.data))
      .catch(console.error);

    axios.get('http://localhost:3000/api/users')
      .then(res => setEmployees(res.data))
      .catch(console.error);
  }, [items]);

  const filteredEmployees = employees.filter(e =>
    e.employeeId.toLowerCase().includes(filter.toLowerCase())
  );

  const addToCart = item => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.price } : i
        );
      }
      return [...prev, { ...item, quantity: 1, total: item.price }];
    });
  };

  const updateQuantity = (id, qty) => {
    setCart(prev => prev.map(i =>
      i.id === id ? { ...i, quantity: qty < 1 ? 1 : qty, total: i.price * (qty < 1 ? 1 : qty) } : i
    ));
  };

  const removeFromCart = id => setCart(prev => prev.filter(i => i.id !== id));

  const totalAmount = cart.reduce((sum, i) => sum + i.total, 0);

  const handleAdminPurchase = async () => {
    if (!selectedEmployee || cart.length === 0) {
      alert('Please select an employee and add items to cart.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/orders', {
       
      });
      setOrder( {orderId: res.data.orderId,total: res.data.total,created_at: res.data.created_at});
      setCart([]);
      setSelectedEmployee('');
    } catch (err) {
      console.error(err);
      alert('Error processing purchase.');
    }
  };

  if (order) {
    return <OrderConfirmationPage order={order} />;
  }

  return (
    <div className="p-6 flex gap-6">
      <div className="w-2/3">
        <h2 className="text-xl font-bold mb-4">Available Items</h2>
        <div className="grid grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="p-4 border rounded shadow flex flex-col justify-between">
              <h3 className="font-semibold">{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => addToCart(item)} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-2">
                <PlusCircle size={16}/> Add
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/3 bg-white p-4 rounded shadow sticky top-6">
        <h2 className="text-xl font-bold mb-4">Admin Purchase</h2>
        <select
          className="w-full border p-2 rounded mb-4"
          value={selectedEmployee}
          onChange={e => setSelectedEmployee(e.target.value)}
        >
          <option value="">-- Select Employee --</option>
          {filteredEmployees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.employeeId})
            </option>
          ))}
        </select>

        {cart.length === 0 ? <p>Cart is empty</p> : (
          <>
            <table className="w-full text-sm mb-4">
              <thead><tr><th>Item</th><th>Qty</th><th>Total</th><th></th></tr></thead>
              <tbody>
                {cart.map(it => (
                  <tr key={it.id}>
                    <td>{it.name}</td>
                    <td>
                      <input type="number" min="1" value={it.quantity}
                        onChange={e => updateQuantity(it.id, parseInt(e.target.value) || 1)}
                        className="w-16 border p-1 rounded" />
                    </td>
                    <td>₹{it.total}</td>
                    <td><button onClick={() => removeFromCart(it.id)}><Trash2 size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mb-4 font-semibold">Total: ₹{totalAmount}</div>
            <button onClick={handleAdminPurchase} className="bg-green-600 text-white w-full py-2 rounded">
              Submit Purchase
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyThroughAdmin;
