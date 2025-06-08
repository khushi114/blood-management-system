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
  const [isLoading, setIsLoading] = useState(false); // Loading state for UX

  const navigate = useNavigate();
  const location = useLocation();

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';

  // Memoized fetchInventory
  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    try {
      // Try fetching with sort and limit
      const res = await axios.get('http://localhost:5000/api/inventory?sort=-createdAt&limit=10');
      console.log('Fetched inventory:', res.data); // Debug API response
      let data = Array.isArray(res.data.data) ? res.data.data : Array.isArray(res.data) ? res.data : [];
      
      // Fallback: If no data or sort/limit not supported, fetch all and sort/limit on frontend
      if (data.length === 0) {
        const fallbackRes = await axios.get('http://localhost:5000/api/inventory');
        console.log('Fallback fetch:', fallbackRes.data);
        data = Array.isArray(fallbackRes.data.data) 
          ? fallbackRes.data.data
          : Array.isArray(fallbackRes.data) 
            ? fallbackRes.data 
            : [];
        // Sort by createdAt (newest first) and limit to 10
        data = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
      }

      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error.response?.data || error.message);
      alert('Error loading inventory. Please try again.');
      setInventory([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch inventory on mount and when location changes
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory, location.pathname]); // Re-fetch when route changes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/inventory', form);
      console.log('POST response:', res.data); // Debug POST response
      alert('Blood entry added!');

      // Append the new item to the inventory state
      const newItem = res.data.data || res.data;
      setInventory((prev) => {
        const updatedInventory = [newItem, ...prev];
        // Sort by createdAt and limit to 10
        return updatedInventory
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
      });

      // Reset form
      setForm({ bloodGroup: '', quantity: '', expiryDate: '' });
    } catch (err) {
      console.error('Error adding inventory:', err.response?.data || err.message);
      alert('Failed to add inventory.');
      await fetchInventory(); // Re-fetch to ensure state is correct
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="blood-inventory-container">
      <h2>Blood Inventory {isAdmin && '(Admin)'}</h2>

      {/* Loading indicator */}
      {isLoading && <p>Loading...</p>}

      {/* Only show form if admin */}
      {isAdmin && (
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

          <button type="submit" disabled={isLoading}>
            Add Inventory
          </button>
        </form>
      )}

      {/* Inventory Table */}
      <h3>Current Inventory (Last 10 Records)</h3>
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