import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const VerifyCode = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [pendingUser, setPendingUser] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Get the pending user only once on component mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('pendingUser');
            if (stored) {
                setPendingUser(JSON.parse(stored));
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Failed to parse pending user:', err);
            navigate('/login');
        }
    }, [navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (!pendingUser?.email) {
                setError('No user email found for verification.');
                return;
            }

            const res = await fetch('http://localhost:5000/api/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: pendingUser.email, code }),
            });

            const data = await res.json();

            if (res.status === 401) {
                alert('Unauthorized. Please login again.');
                navigate('/login');
                return;
            }

            if (res.ok && data.verified) {
                // Combine user and token before saving
                const fullUser = {
                    ...data.user,
                    token: data.token,
                };

                localStorage.setItem('user', JSON.stringify(fullUser));
                localStorage.removeItem('pendingUser');
                login(fullUser); // context login
                setCode('');
                navigate('/dashboard');
            } else {
                setError(data.message || 'Invalid verification code');
            }
        } catch (err) {
            console.error('Verification error:', err);
            setError('Verification failed. Please try again.');
        }
    };

    // Show nothing until pendingUser is loaded
    if (!pendingUser) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-red-400 p-4">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full">
                {/* Checkmark Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-red-500 rounded-full p-4 shadow-md">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Enter Verification Code
                </h2>

                {/* Form */}
                <form onSubmit={handleVerify}>
                    <div className="mb-6">
                        <label htmlFor="code" className="block text-gray-700 font-semibold mb-2">
                            Verification Code
                        </label>
                        <input
                            id="code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter code from email"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-center mb-4">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyCode;