import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './BloodInventory.css'; // Optional styling

const BloodInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({
    bloodGroup: '',
    quantity: '',
    expiryDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token'); // ✅ Get token from correct key

    try {
      const response = await axios.get('http://localhost:5000/api/inventory', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Token:', token); // Optional debug log
      setInventory(response.data);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.bloodGroup || !form.quantity || !form.expiryDate) {
      alert('All fields are required');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/inventory',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setForm({ bloodGroup: '', quantity: '', expiryDate: '' });
      fetchInventory();
    } catch (error) {
      console.error('Error adding inventory:', error);
      alert('Failed to add inventory');
    }
  };

  return (
    <div className="inventory-container">
      <h2>Blood Inventory Management</h2>

      <form className="inventory-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group (e.g., A+)"
          value={form.bloodGroup}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (units)"
          value={form.quantity}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="expiryDate"
          placeholder="Expiry Date"
          value={form.expiryDate}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="submit-btn">Add Inventory</button>
      </form>

      <h3>Available Blood Units</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item._id}>
                <td>{item.bloodGroup}</td>
                <td>{item.quantity}</td>
                <td>{new Date(item.expiryDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BloodInventory;
