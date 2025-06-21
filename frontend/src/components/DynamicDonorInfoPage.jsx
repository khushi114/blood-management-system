import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Users, Calendar, Droplet } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const DynamicDonorInfoPage = () => {
  const [donors, setDonors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    bloodType: '',
    lastDonation: '',
    firstDonation: '',
    numberOfDonations: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/donors`);
      setDonors(response.data);
      setLoading(false);
    } catch (error) {
      setError(`Error fetching donors: ${error.response?.data?.message || error.message}`);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.bloodType ||
      !formData.lastDonation ||
      !formData.firstDonation ||
      !formData.numberOfDonations
    ) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/donors`, {
        name: formData.name,
        bloodType: formData.bloodType,
        lastDonation: formData.lastDonation,
        firstDonation: formData.firstDonation,
        numberOfDonations: parseInt(formData.numberOfDonations),
      });
      await fetchDonors();
      setFormData({
        name: '',
        bloodType: '',
        lastDonation: '',
        firstDonation: '',
        numberOfDonations: 1,
      });
      setError(null);
    } catch (error) {
      setError(`Error adding donor: ${error.response?.data?.message || error.message}`);
    }
  };

  const calculateMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  };

  const madeDonationInMarch2024 = (lastDonation) => {
    const date = new Date(lastDonation);
    return date.getFullYear() === 2024 && date.getMonth() === 2;
  };

  const currentDate = new Date('2025-06-15');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        <span className="ml-4 text-xl text-gray-700">Loading donors...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-600 text-2xl font-bold mb-4">{error}</div>
        <button
          onClick={fetchDonors}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Blood Bank System</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Donor Management</h2>

        {/* Add Donor Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Donor</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter donor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Type</label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Donation Date</label>
              <input
                type="date"
                name="lastDonation"
                value={formData.lastDonation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Donation Date</label>
              <input
                type="date"
                name="firstDonation"
                value={formData.firstDonation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Donations</label>
              <input
                type="number"
                name="numberOfDonations"
                value={formData.numberOfDonations}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
            >
              Add Donor
            </button>
          </form>
        </div>

        {/* Donor List */}
        {donors.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Donor Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor) => {
                const monthsSinceLastDonation = calculateMonths(donor.lastDonation, currentDate);
                const monthsSinceFirstDonation = calculateMonths(donor.firstDonation, currentDate);
                const totalVolume = donor.numberOfDonations * 450;
                const donatedInMarch2024 = madeDonationInMarch2024(donor.lastDonation);

                return (
                  <div
                    key={donor._id}
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-red-100 p-3 rounded-full mr-4">
                        <Users className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{donor.name}</h4>
                        <span className="text-red-600 font-medium">{donor.bloodType}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-600 text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          Last Donation: {new Date(donor.lastDonation).toLocaleDateString()}
                        </span>
                      </div>
                      <p>Months Since Last Donation: {monthsSinceLastDonation}</p>
                      <p>Number of Donations: {donor.numberOfDonations}</p>
                      <p>Total Volume Donated: {totalVolume} c.c.</p>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          First Donation: {new Date(donor.firstDonation).toLocaleDateString()}
                        </span>
                      </div>
                      <p>Months Since First Donation: {monthsSinceFirstDonation}</p>
                      <p>Made Donation in March 2024: {donatedInMarch2024 ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No donors added yet. Use the form above to add a new donor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicDonorInfoPage;