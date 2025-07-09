import React, { useEffect, useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { Tooltip } from 'react-tooltip';

const CheckBalancePage = ({ role = 'admin', userId = '11' }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}/money`);
        const data = await res.json();
        setBalance(data.money);
        setTransactions(data.transactions);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchBalanceData();
    const interval = setInterval(fetchBalanceData, 5000);
    return () => clearInterval(interval);
  }, [userId, balance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <h2 className="flex justify-center text-3xl font-bold text-green-600 mb-8 ">Check Balance</h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          {role === 'admin' ? 'Total Balance' : 'Your Balance'}
        </h3>
        <p className="text-5xl font-extrabold text-blue-700 tracking-wide">₹ {balance.toLocaleString()}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-5">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm text-gray-700">
            <thead className="bg-gray-300 text-sm text-gray-600">
              <tr>
                <th className="border p-3">S.No</th>
                <th className="border p-3">Txn ID</th>
                <th className="border p-3">Amount</th>
                <th className="border p-3">Type</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Balance After</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={role === 'admin' ? 7 : 6} className="text-center p-4 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((txn, index) => (
                  <tr key={txn.id} className="text-center hover:bg-gray-50 transition-colors duration-150">
                    <td className="border p-3 font-medium">{index + 1}</td>
                    <td className="border p-3 text-gray-500">{txn.id}</td>
                    <td
                      className={`border p-3 font-bold ${txn.type === 'Credit' ? 'text-green-600' : 'text-red-500'
                        }`}
                    >
                      ₹ {txn.amount}
                    </td>
                    <td className="border p-3">
                      <div className="flex items-center justify-center gap-2">
                        {txn.type === 'Credit' ? (
                          <ArrowDownCircle size={18} className="text-green-500" title="Credit" />
                        ) : (
                          <ArrowUpCircle size={18} className="text-red-500" title="Debit" />
                        )}
                        <span>{txn.type}</span>
                      </div>
                    </td>
                    <td className="border p-3">{txn.date}</td>
                    <td className="border p-3">₹ {txn.balanceAfter}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/add-money')}
          className="bg-green-600 text-white font-bold px-6 py-3 rounded-xl  hover:bg-green-700 "
        >
          Add Money
        </button>
      </div>
    </div>
  );
};

export default CheckBalancePage;
