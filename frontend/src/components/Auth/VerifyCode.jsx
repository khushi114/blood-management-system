
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
        <div className="auth-container">
            <h2>Enter Verification Code</h2>
            <form onSubmit={handleVerify} className="auth-form">
                <div className="form-group">
                    <label>Verification Code</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        placeholder="Enter code from email"
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="auth-button">Verify</button>
            </form>
        </div>
    );
};

export default VerifyCode;
