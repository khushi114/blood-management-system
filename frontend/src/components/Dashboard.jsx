import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Package, 
  FileText, 
  Activity, 
  TrendingUp, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Plus,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  const stats = [
    { label: 'Total Donors', value: '2,847', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Blood Units', value: '1,234', icon: Package, color: 'bg-red-500', change: '+8%' },
    { label: 'Requests Today', value: '45', icon: FileText, color: 'bg-green-500', change: '+23%' },
    { label: 'Active Campaigns', value: '12', icon: Activity, color: 'bg-purple-500', change: '+5%' }
  ];

  const recentActivities = [
    { type: 'donation', message: 'New donation received - O+ blood type', time: '2 hours ago' },
    { type: 'request', message: 'Emergency request for AB- blood type', time: '4 hours ago' },
    { type: 'donor', message: 'New donor registration - John Smith', time: '6 hours ago' },
    { type: 'inventory', message: 'Low stock alert - B+ blood type', time: '8 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-red-500 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Blood Bank System</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, <span className="text-white">{user.name || user.email}</span>
                </h2>
                <p className="text-red-100 text-lg">
                  Ready to save lives today? Here's your dashboard overview.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Calendar className="w-12 h-12 text-white mb-2" />
                  <p className="text-sm text-red-100">Today</p>
                  <p className="text-xl font-bold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-red-200"
                onClick={() => handleNavigation('/BloodInventory')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-red-100 p-3 rounded-full group-hover:bg-red-200 transition-colors">
                    <Package className="w-6 h-6 text-red-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Blood Inventory</h4>
                <p className="text-gray-600 mb-4">Monitor blood stock levels and manage inventory across all blood types.</p>
                <div className="flex items-center text-sm text-red-600 font-medium">
                  <span>View Inventory</span>
                </div>
              </div>

              <div 
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200"
                onClick={() => handleNavigation('/requests')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Blood Requests</h4>
                <p className="text-gray-600 mb-4">Process and manage blood donation requests from hospitals and clinics.</p>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  <span>View Requests</span>
                </div>
              </div>

              <div 
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-green-200"
                onClick={() => handleNavigation('/donors')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Donor Management</h4>
                <p className="text-gray-600 mb-4">Register new donors, track donation history, and manage donor profiles.</p>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <span>Manage Donors</span>
                </div>
              </div>

              <div 
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-purple-200"
                onClick={() => handleNavigation('/campaigns')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-full group-hover:bg-purple-200 transition-colors">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Campaigns</h4>
                <p className="text-gray-600 mb-4">Create and manage blood donation campaigns and awareness programs.</p>
                <div className="flex items-center text-sm text-purple-600 font-medium">
                  <span>View Campaigns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
                    <Heart className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-red-600 hover:text-red-700 font-medium py-2">
              View All Activities
            </button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Contact</h3>
              <p className="text-red-700 mb-4">Need immediate assistance? Contact our emergency response team.</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-red-800">1-800-BLOOD</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-red-800">emergency@bloodbank.org</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-red-600 p-4 rounded-full">
                <Phone className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;