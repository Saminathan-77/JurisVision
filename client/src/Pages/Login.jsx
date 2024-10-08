import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post('/api/login', { email, password });
      // alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="login-form">
        <h2 className="title">Welcome Back</h2>
        <form onSubmit={handleLogin} className="form">
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            className="input"
          />
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            className="input"
          />
          <button
            type="submit"
            className="submit-button"
          >
            Login
          </button>
        </form>
        <p className="signup-prompt">
          Don't have an account? <a href="/signup" className="signup-link">Sign up</a>
        </p>
      </div>
      <style jsx>{`
        .login-container {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to left, #ec4899, #a855f7, #3b82f6);
          padding: 1rem;
        }
        .login-form {
          position: relative;
          width: 100%;
          max-width: 400px;
          background: rgba(31, 41, 55, 0.8);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: transform 1s;
        }
        .login-form:hover {
          transform: scale(1.05);
        }
        .title {
          font-size: 2rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .label {
          color: white;
          font-weight: 600;
        }
        .input {
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background: #f7fafc;
          color: #4a5568;
          transition: border 0.3s;
        }
        .input:focus {
          outline: none;
          border-color: #4299e1;
        }
        .submit-button {
          background-color: black;
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background 0.3s, transform 0.3s;
        }
        .submit-button:hover {
          background-color: #3182ce;
          transform: scale(1.05);
        }
        .signup-prompt {
          margin-top: 1.5rem;
          text-align: center;
          color: #d1d5db;
        }
        .signup-link {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </motion.div>
  );
};

export default Login;
