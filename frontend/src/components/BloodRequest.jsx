import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BloodRequest = () => {
  const navigate = useNavigate();
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
  } catch (err) {
    console.error('Failed to parse user from localStorage:', err);
  }

  const isAdmin = user?.role === 'admin';

  const [form, setForm] = useState({
    bloodGroup: '',
    quantity: '',
    hospital: '',
    contact: '',
    reason: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState('');

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests');
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchRequests();
    }
  }, [isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.bloodGroup) return 'Please select a blood group.';
    if (!form.quantity || parseInt(form.quantity) <= 0) return 'Quantity must be a positive number.';
    if (!form.hospital.trim()) return 'Hospital name is required.';
    if (!form.contact.match(/^\+?\d{10,15}$/)) return 'Please enter a valid contact number.';
    if (!form.reason.trim()) return 'Reason is required.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!user?._id) {
      setError('You must be logged in to request blood.');
      setIsLoading(false);
      navigate('/login');
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/requests', {
        ...form,
        quantity: parseInt(form.quantity),
        userId: user._id,
      });
      alert('Blood request submitted successfully.');
      setForm({
        bloodGroup: '',
        quantity: '',
        hospital: '',
        contact: '',
        reason: '',
      });
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit request.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/requests/${id}`);
      alert('Request deleted');
      fetchRequests();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.hospital.toLowerCase().includes(search.toLowerCase()) ||
      req.bloodGroup.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterGroup ? req.bloodGroup === filterGroup : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {isAdmin ? (
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">All Blood Requests (Admin)</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by blood group or hospital"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border rounded-md w-full md:w-1/2"
            />
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="p-2 border rounded-md w-full md:w-1/4"
            >
              <option value="">Filter by Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <table className="w-full border text-sm text-left text-gray-700 shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Blood Group</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Hospital</th>
                <th className="p-2 border">Contact</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req._id}>
                  <td className="p-2 border">{req.bloodGroup}</td>
                  <td className="p-2 border">{req.quantity}</td>
                  <td className="p-2 border">{req.hospital}</td>
                  <td className="p-2 border">{req.contact}</td>
                  <td className="p-2 border">{req.reason}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No matching requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Blood Request Form</h2>
          {error && <p className="text-center text-red-600 mb-4">{error}</p>}
          {isLoading && <p className="text-center text-gray-500">Submitting...</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required className="p-2 border rounded">
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="p-2 border rounded" required />
            <input type="text" name="hospital" placeholder="Hospital Name" value={form.hospital} onChange={handleChange} className="p-2 border rounded" required />
            <input type="text" name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} className="p-2 border rounded" required />
            <textarea name="reason" placeholder="Reason" value={form.reason} onChange={handleChange} className="p-2 border rounded md:col-span-2" required rows="3" />
            <button type="submit" disabled={isLoading} className="bg-red-600 text-white py-2 px-4 rounded-md md:col-span-2 hover:bg-red-700 transition">
              {isLoading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BloodRequest;
