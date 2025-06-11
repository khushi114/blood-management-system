import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        adminCode: isAdmin ? adminCode : undefined,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Store user + token together
      const userWithToken = {
        ...data.user,
        token: data.token,
      };
      localStorage.setItem('pendingUser', JSON.stringify(userWithToken));

      // ✅ Send verification code
      await fetch('http://localhost:5000/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // Redirect to verification page
      navigate('/verify');
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('Something went wrong. Please try again.');
  }
};


  return (
    <div className="auth-container">
      <h2>Login to Blood Bank</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Login as Admin
          </label>
        </div>
        {isAdmin && (
          <div className="form-group">
            <label>Admin Code</label>
            <input
              type="text"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              required={isAdmin}
              placeholder="Enter Admin Code"
            />
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;