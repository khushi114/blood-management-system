import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  // Handle scroll to detect active section
  useEffect(() => {
    const sections = ['home', 'services', 'how-it-works', 'contact'];
    const handleScroll = () => {
      let currentSection = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/'); // Navigate to homepage if not already there
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false); // Close mobile menu after clicking a link
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false); // Close mobile menu after logout
  };

  // Determine if a link is active (based on scroll position or route)
  const isActive = (sectionId) =>
    activeSection === sectionId
      ? 'text-red-500 font-semibold border-b-2 border-red-500 transition-all duration-300'
      : 'text-gray-700 hover:text-red-500 hover:border-b-2 hover:border-red-300 transition-all duration-300';

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg w-full">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-24 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="https://img.freepik.com/premium-vector/blood-donation-logo-design-vector_369465-218.jpg?w=2000"
              alt="Logo"
              className="h-14 w-14 transition-transform duration-300 hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-gray-800 tracking-tight">
                LifeLinkAI
              </span>
              <span className="text-sm text-gray-500 font-medium">
                Blood Donation
              </span>
            </div>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-red-500 focus:outline-none"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isOpen ? 'flex' : 'hidden'
            } md:flex flex-col md:flex-row md:items-center absolute md:static top-24 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-6 md:p-0 space-y-4 md:space-y-0 md:space-x-8`}
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className={`text-lg ${isActive('home')}`}
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className={`text-lg ${isActive('services')}`}
            >
              Services
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
              className={`text-lg ${isActive('how-it-works')}`}
            >
              How it Works
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className={`text-lg ${isActive('contact')}`}
            >
              Contact
            </a>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-lg text-gray-700 hover:text-red-500 hover:border-b-2 hover:border-red-300 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/BloodInventory"
                  className="text-lg text-gray-700 hover:text-red-500 hover:border-b-2 hover:border-red-300 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Inventory
                </Link>
                <Link
                  to="/requests"
                  className="text-lg text-gray-700 hover:text-red-500 hover:border-b-2 hover:border-red-300 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Requests
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;