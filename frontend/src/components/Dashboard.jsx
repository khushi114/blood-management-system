import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../App.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;  // No navigate here!
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-red-700 text-center lg:text-left">
            Welcome, {user.email}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 dashboard-grid">
          <div className="dashboard-card bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">Blood Inventory</h3>
            <p className="text-gray-600 mt-3 text-base lg:text-lg">View and manage blood stock levels.</p>
            <button
              className="card-button mt-4 bg-red-600 text-white px-5 py-2.5 rounded-lg text-base lg:text-lg hover:bg-red-700 transition w-full lg:w-auto"
              onClick={() => handleNavigation('/BloodInventory')}
            >
              View Inventory
            </button>
          </div>
          <div className="dashboard-card bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">Blood Requests</h3>
            <p className="text-gray-600 mt-3 text-base lg:text-lg">Manage blood donation requests.</p>
            <button
              className="card-button mt-4 bg-red-600 text-white px-5 py-2.5 rounded-lg text-base lg:text-lg hover:bg-red-700 transition w-full lg:w-auto"
              onClick={() => handleNavigation('/requests')}
            >
              View Requests
            </button>
          </div>
          <div className="dashboard-card bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">Donor Management</h3>
            <p className="text-gray-600 mt-3 text-base lg:text-lg">Register and track donors.</p>
            <button
              className="card-button mt-4 bg-red-600 text-white px-5 py-2.5 rounded-lg text-base lg:text-lg hover:bg-red-700 transition w-full lg:w-auto"
              onClick={() => handleNavigation('/donors')}
            >
              Manage Donors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




