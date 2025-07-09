import React, { useState, useEffect } from 'react';
import { Pencil, Trash, Save } from 'lucide-react';
import axios from 'axios';

const DeleteItemsPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ quantity: '', rate: '' });
  const itemsPerPage = 10;

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const startEditing = (item) => {
    setEditId(item.id);
    setEditData({ quantity: item.quantity, rate: item.rate });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ quantity: '', rate: '' });
  };

  const handleChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveChanges = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/items/${id}`, {
        quantity: editData.quantity,
        rate: editData.rate,
      });
      fetchItems();
      cancelEdit();
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 px-10 py-6">
        <h2 className="flex justify-center text-green-500 text-3xl font-bold mb-6">Edit / Delete Items</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">S.No</th>
                <th className="border p-2">Item</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border p-2">{item.name}</td>

                  <td className="border p-2 text-center">
                    {editId === item.id ? (
                      <input
                        name="quantity"
                        value={editData.quantity}
                        onChange={handleChange}
                        type="number"
                        className="w-16 border rounded px-1"
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>

                  <td className="border p-2 text-center">
                    {editId === item.id ? (
                      <input
                        name="rate"
                        value={editData.rate}
                        onChange={handleChange}
                        type="number"
                        className="w-16 border rounded px-1"
                      />
                    ) : (
                      item.rate
                    )}
                  </td>

                  <td className="border p-2 text-center">{item.status}</td>

                  <td className="border p-2 text-center">
                    <div className="flex justify-center space-x-3">
                      {editId === item.id ? (
                        <>
                          <button
                            onClick={() => saveChanges(item.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Save size={18} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(item)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4 space-x-2 items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-1 bg-white border hover:bg-gray-100"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-bold">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-1 bg-white border hover:bg-gray-100"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default DeleteItemsPage;
