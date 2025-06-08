import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import BloodInventory from './components/BloodInventory'; 
import BloodRequest from './components/BloodRequest';
import VerifyCode from './components/Auth/VerifyCode';

import './App.css';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/BloodInventory" element={<BloodInventory />} /> 
             <Route path="/Requests" element={<BloodRequest/>} /> 
              <Route path="/" element={<h1>Blood Bank Home</h1>} />
              <Route path="/verify" element={<VerifyCode />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;