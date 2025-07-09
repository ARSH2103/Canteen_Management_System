import React, { useEffect, useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import axios from 'axios';

const TransactionDetailsPage = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}/transactions`);
        const allTransactions = response.data;

        setTransactions(allTransactions);
        setTotalPages(Math.ceil(allTransactions.length / limit)); // ✅ calculate total pages
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
        setTotalPages(1);
      }
    };

    fetchTransactions();
  }, [userId]);

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Sr.No</th>
              <th className="p-3">Txn ID</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Balance After</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice((page - 1) * limit, page * limit).map((txn,index) => (
              <tr key={txn.transactionId} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{txn.transactionId}</td>
                <td className={`p-3 ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{txn.amount}
                </td>
                <td className="p-3 capitalize flex items-center gap-2">
                  {txn.type === 'credit' ? (
                    <ArrowDownCircle className="text-green-500" size={18} />
                  ) : (
                    <ArrowUpCircle className="text-red-500" size={18} />
                  )}
                  {txn.type}
                </td>
                <td className="p-3">{new Date(txn.date).toLocaleString()}</td>
                <td className="p-3">₹{txn.balanceAfter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
