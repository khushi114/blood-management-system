// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import '../App.css';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   // Helper to highlight active link
//   const isActive = (path) => location.pathname === path ? 'active-link' : '';

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <Link to="/" className={isActive('/')}>Blood Bank</Link>
//       </div>
//       <ul className="navbar-links">
//         <li>
//           <Link to="/" className={isActive('/')}>Home</Link>
//         </li>
//         {user ? (
//           <>
//             <li>
//               <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
//             </li>
//             <li>
//               <Link to="/BloodInventory" className={isActive('/BloodInventory')}>Blood Inventory</Link>
//             </li>
//             <li>
//               <Link to="/requests" className={isActive('/requests')}>Requests</Link>
//             </li>
//             <li>
//               <button onClick={handleLogout} className="logout-button">
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/login" className={isActive('/login')}>Login</Link>
//             </li>
//             <li>
//               <Link to="/register" className={isActive('/register')}>Register</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-white font-semibold border-b-2 border-white'
      : 'text-gray-200 hover:text-white';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo or Brand */}
        <div className="text-2xl font-bold text-white tracking-wide">
          <Link to="/" className="hover:opacity-90">🩸 Blood Bank</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 text-lg">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/services" className={isActive('/services')}>Services</Link></li>
          <li><Link to="/testimonials" className={isActive('/testimonials')}>Testimonials</Link></li>
          <li><Link to="/about" className={isActive('/about')}>About</Link></li>
          <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>

          {user ? (
            <>
              <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
              <li><Link to="/BloodInventory" className={isActive('/BloodInventory')}>Inventory</Link></li>
              <li><Link to="/requests" className={isActive('/requests')}>Requests</Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 bg-white text-red-700 font-medium rounded hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
              <li>
                <Link
                  to="/register"
                  className="ml-2 px-4 py-2 bg-white text-red-700 font-medium rounded hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
