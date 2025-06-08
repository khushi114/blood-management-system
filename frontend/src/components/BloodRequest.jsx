// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// class ErrorBoundary extends React.Component {
//   state = { hasError: false };

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error('ErrorBoundary caught:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="text-center text-bloodRed-primary font-inter text-base mt-5">
//           Something went wrong. Please try again later.
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// const BloodRequest = () => {
//   console.log('Rendering BloodRequest.jsx');
//   const navigate = useNavigate();
//   let user = null;
//   try {
//     user = JSON.parse(localStorage.getItem('user') || '{}');
//   } catch (err) {
//     console.error('Failed to parse user from localStorage:', err);
//   }

//   const [form, setForm] = useState({
//     bloodGroup: '',
//     quantity: '',
//     hospital: '',
//     contact: '',
//     reason: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (!form.bloodGroup) return 'Please select a blood group.';
//     if (!form.quantity || parseInt(form.quantity) <= 0) return 'Quantity must be a positive number.';
//     if (!form.hospital.trim()) return 'Hospital name is required.';
//     if (!form.contact.match(/^\+?\d{10,15}$/)) return 'Please enter a valid contact number (10-15 digits).';
//     if (!form.reason.trim()) return 'Reason is required.';
//     return '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!user?._id) {
//       setError('You must be logged in to request blood.');
//       setIsLoading(false);
//       navigate('/login');
//       return;
//     }

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       setIsLoading(false);
//       return;
//     }

//     try {
//        await axios.post('http://localhost:5000/api/requests', {
//         ...form,
//         quantity: parseInt(form.quantity),
//         userId: user._id,
//       });
//       alert('Blood request submitted successfully.');
//       setForm({
//         bloodGroup: '',
//         quantity: '',
//         hospital: '',
//         contact: '',
//         reason: '',
//       });
//       navigate('/dashboard');
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || 'Failed to submit request.';
//       setError(errorMessage);
//       console.error('Request error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div className="max-w-7xl mx-auto mt-10 mb-6 px-4 sm:px-6 lg:px-8 py-12 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg font-inter text-gray-800 min-h-[80vh]">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-bloodRed-primary to-bloodRed-dark bg-clip-text text-transparent">
//           Blood Request Form
//         </h2>
//         {error && (
//           <p className="text-center text-bloodRed-primary text-sm font-medium mb-4 animate-pulse">
//             {error}
//           </p>
//         )}
//         {isLoading && (
//           <p className="text-center text-gray-500 italic text-sm mb-4 animate-pulse">
//             Loading...
//           </p>
//         )}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
//           <div className="flex flex-col">
//             <label htmlFor="bloodGroup" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
//               Blood Group
//             </label>
//             <select
//               id="bloodGroup"
//               name="bloodGroup"
//               value={form.bloodGroup}
//               onChange={handleChange}
//               required
//               className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
//             >
//               <option value="">Select</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="quantity" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
//               Quantity (Units)
//             </label>
//             <input
//               type="number"
//               id="quantity"
//               name="quantity"
//               min="1"
//               value={form.quantity}
//               onChange={handleChange}
//               required
//               className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="hospital" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
//               Hospital Name
//             </label>
//             <input
//               type="text"
//               id="hospital"
//               name="hospital"
//               value={form.hospital}
//               onChange={handleChange}
//               required
//               className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="contact" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
//               Contact Number
//             </label>
//             <input
//               type="text"
//               id="contact"
//               name="contact"
//               value={form.contact}
//               onChange={handleChange}
//               required
//               className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
//             />
//           </div>
//           <div className="flex flex-col md:col-span-2">
//             <label htmlFor="reason" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
//               Reason
//             </label>
//             <textarea
//               id="reason"
//               name="reason"
//               value={form.reason}
//               onChange={handleChange}
//               required
//               rows="4"
//               className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`md:col-span-2 py-2 px-4 rounded-md text-white font-semibold text-sm sm:text-base transition duration-300 ${
//               isLoading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-bloodRed-primary to-bloodRed-dark hover:from-bloodRed-dark hover:to-bloodRed-primary hover:shadow-lg hover:scale-105'
//             }`}
//           >
//             {isLoading ? 'Submitting...' : 'Submit Request'}
//           </button>
//         </form>
//         <button
//           onClick={() => navigate('/dashboard')}
//           className="block mx-auto mt-6 py-2 px-4 rounded-md text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-bloodRed-dashboard to-bloodRed-dashboardLight hover:from-bloodRed-dashboardLight hover:to-bloodRed-dashboard hover:shadow-lg hover:scale-105 transition duration-300"
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default BloodRequest;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-bloodRed-primary font-inter text-base mt-5">
          Something went wrong. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}

const BloodRequest = () => {
  console.log('Rendering BloodRequest.jsx');
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
  } catch (err) {
    console.error('Failed to parse user from localStorage:', err);
  }

  const isAdmin = user?.role === 'admin';

  // Optional: Redirect admins to dashboard
  useEffect(() => {
    if (isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);

  const [form, setForm] = useState({
    bloodGroup: '',
    quantity: '',
    hospital: '',
    contact: '',
    reason: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.bloodGroup) return 'Please select a blood group.';
    if (!form.quantity || parseInt(form.quantity) <= 0) return 'Quantity must be a positive number.';
    if (!form.hospital.trim()) return 'Hospital name is required.';
    if (!form.contact.match(/^\+?\d{10,15}$/)) return 'Please enter a valid contact number (10-15 digits).';
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

    if (isAdmin) {
      setError('Admins are not allowed to submit blood requests.');
      setIsLoading(false);
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
      console.error('Request error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdmin) {
    return (
      <div className="text-center text-bloodRed-primary font-inter text-base mt-10">
        Admins are not allowed to submit blood requests.
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto mt-10 mb-6 px-4 sm:px-6 lg:px-8 py-12 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg font-inter text-gray-800 min-h-[80vh]">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-bloodRed-primary to-bloodRed-dark bg-clip-text text-transparent">
          Blood Request Form
        </h2>
        {error && (
          <p className="text-center text-bloodRed-primary text-sm font-medium mb-4 animate-pulse">
            {error}
          </p>
        )}
        {isLoading && (
          <p className="text-center text-gray-500 italic text-sm mb-4 animate-pulse">
            Loading...
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col">
            <label htmlFor="bloodGroup" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
            >
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
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Quantity (Units)
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="hospital" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Hospital Name
            </label>
            <input
              type="text"
              id="hospital"
              name="hospital"
              value={form.hospital}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contact" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="reason" className="mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              rows="4"
              className="p-2 border border-gray-300 rounded-md bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bloodRed-primary focus:border-bloodRed-primary transition duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`md:col-span-2 py-2 px-4 rounded-md text-white font-semibold text-sm sm:text-base transition duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-bloodRed-primary to-bloodRed-dark hover:from-bloodRed-dark hover:to-bloodRed-primary hover:shadow-lg hover:scale-105'
            }`}
          >
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
        <button
          onClick={() => navigate('/dashboard')}
          className="block mx-auto mt-6 py-2 px-4 rounded-md text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-bloodRed-dashboard to-bloodRed-dashboardLight hover:from-bloodRed-dashboardLight hover:to-bloodRed-dashboard hover:shadow-lg hover:scale-105 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default BloodRequest;
