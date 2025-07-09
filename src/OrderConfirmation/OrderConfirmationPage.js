import React from 'react';

const OrderConfirmationPage = ({ order }) => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-4 text-green-700">
        Order Confirmed!
      </h2>
      <p>
        <strong>Order ID:</strong> {order.orderId}
      </p>
      <p>
        <strong>Total Amount:</strong> ₹{order.total}
      </p>

      <table className="w-full mt-4 text-left">
        <thead>
          <tr>
            <th className="p-1">Item</th>
            <th className="p-1">Qty</th>
            <th className="p-1">Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((it, idx) => (
            <tr key={idx}>
              <td className="p-1">{it.name}</td>
              <td className="p-1">{it.quantity}</td>
              <td className="p-1">{it.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Make Another Purchase
      </button>
    </div>
  );
};

export default OrderConfirmationPage;
