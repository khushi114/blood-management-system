import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BloodInventory.css'; // Optional styling

const BloodInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({
    bloodGroup: '',
    quantity: '',
    expiryDate: '',
  });

  const navigate = useNavigate();

  // Load inventory from backend
  const fetchInventory = async () => {
    try {
      const res = await axios.get('/api/inventory');
      console.log("Fetched Inventory:", res.data);
      setInventory(res.data);
    } catch (error) {
      console.error('Error fetching inventory:', error.response?.data || error.message);
      alert('Error loading inventory');
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/inventory', form);
      alert('Blood entry added!');
      setForm({ bloodGroup: '', quantity: '', expiryDate: '' });
      fetchInventory();
    } catch (err) {
      console.error('Error adding inventory:', err.response?.data || err.message);
      alert('Failed to add inventory.');
    }
  };

  return (
    <div className="blood-inventory-container">
      <h2>Blood Inventory (Admin)</h2>

      {/* Form for admin to add blood entry */}
      <form onSubmit={handleSubmit} className="inventory-form">
        <label>
          Blood Group:
          <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </label>

        <label>
          Quantity (Units):
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </label>

        <label>
          Expiry Date:
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Inventory</button>
      </form>

      {/* Inventory Table */}
      <h3>Current Inventory</h3>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item._id}>
                <td>{item.bloodGroup}</td>
                <td>{item.quantity}</td>
                <td>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <br />
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
};

export default BloodInventory;
