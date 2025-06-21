import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Heart,
  Calendar,
  MapPin,
  Plus,
  Search,
  Users,
  Activity
} from 'lucide-react';

// For Vite projects, use import.meta.env; for Create React App, use process.env
const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  'http://localhost:5000/api';

const Campaigns = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    status: 'upcoming'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch campaigns from backend
  useEffect(() => {
    if (!user || !user.token) {
      setLoading(false);
      navigate('/login');
      return;
    }
    setLoading(true);
    axios.get(`${API_BASE_URL}/campaigns`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => {
        setCampaigns(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch campaigns: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      });
  }, [user, navigate]);

  const handleAddCampaign = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      setError('You must be logged in to add a campaign.');
      return;
    }
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const res = await axios.post(`${API_BASE_URL}/campaigns`, newCampaign, config);
      setCampaigns([...campaigns, res.data]);
      setShowAddModal(false);
      setNewCampaign({
        title: '',
        date: '',
        location: '',
        description: '',
        status: 'upcoming'
      });
    } catch (err) {
      setError('Error adding campaign: ' + (err.response?.data?.message || err.message));
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        <span className="ml-4 text-xl text-gray-700">Loading campaigns...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-600 text-2xl font-bold mb-4">{error}</div>
        <button onClick={() => window.location.reload()} className="bg-red-500 text-white px-4 py-2 rounded">Retry</button>
      </div>
    );
  }

  // User not logged in or malformed user object
  if (!user || !user.token || !user.role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-600 text-2xl font-bold mb-4">You must be logged in to view campaigns.</div>
        <button onClick={() => navigate('/login')} className="bg-red-500 text-white px-4 py-2 rounded">Go to Login</button>
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
              <h1 className="text-2xl font-bold text-gray-900"></h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Blood Donation Campaigns</h2>
            <p className="text-gray-600 mt-2">Discover upcoming and ongoing blood donation campaigns in your area.</p>
          </div>
          {user.role === 'admin' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Campaign
            </button>
          )}
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${campaign.status === 'running' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
              <div className="space-y-2 mb-4 text-gray-600 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(campaign.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {campaign.location}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
              <button className="text-red-600 font-medium text-sm hover:text-red-700">Learn More</button>
            </div>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No campaigns found matching your search.</p>
          </div>
        )}
      </div>

      {/* Add Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Campaign</h2>
            <form onSubmit={handleAddCampaign}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={newCampaign.date}
                  onChange={(e) => setNewCampaign({ ...newCampaign, date: e.target.value })}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newCampaign.location}
                  onChange={(e) => setNewCampaign({ ...newCampaign, location: e.target.value })}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="4"
                />
                <select
                  value={newCampaign.status}
                  onChange={(e) => setNewCampaign({ ...newCampaign, status: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="running">Running</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="text-gray-600 hover:text-gray-800">Cancel</button>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;