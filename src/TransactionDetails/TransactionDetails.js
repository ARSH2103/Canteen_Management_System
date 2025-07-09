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

  const paginatedTransactions = transactions.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      <h2 className=" flex justify-center text-3xl font-bold mb-4 text-green-600">Transaction Details</h2>
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
            {paginatedTransactions.length === 0 ? (
              <tr>

              </tr>
            ) : (
              paginatedTransactions.map((txn, index) => (
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
