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
      // Simulate a login process
      // const response = await axios.post('/api/login', { email, password });
      navigate('/'); // Navigate to home on successful login
    } catch (error) {
      alert('Login failed. Please check your credentials.'); // Handle error
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
          <button type="submit" className="submit-button">
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
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
            url('https://images.unsplash.com/photo-1514458305583-e67f4e153b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDl8fHNjbGV8ZW58MHx8fHwxNjkwMzI2NzYw&ixlib=rb-1.2.1&q=80&w=1080'); /* Use a legal background image */
          background-size: cover;
          background-position: center;
          padding: 1rem;
        }
        .login-form {
          width: 100%;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.9); /* Slightly transparent white background */
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          transition: transform 0.5s;
        }
        .login-form:hover {
          transform: scale(1.03);
        }
        .title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .label {
          color: #4a5568;
          font-weight: 600;
        }
        .input {
          padding: 0.8rem;
          border: 1px solid #cbd5e0;
          border-radius: 0.5rem;
          background: #f8fafc;
          color: #1f2937;
          transition: border-color 0.3s;
        }
        .input:focus {
          outline: none;
          border-color: #4c51bf; /* Purple border on focus */
        }
        .submit-button {
          background-color: #4c51bf; /* Deep purple for a sleek look */
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .submit-button:hover {
          background-color: #3c366b; /* Darker shade on hover */
          transform: scale(1.05);
        }
        .signup-prompt {
          margin-top: 1.5rem;
          text-align: center;
          color: #4a5568;
        }
        .signup-link {
          color: #4c51bf;
          text-decoration: underline;
        }
      `}</style>
    </motion.div>
  );
};

export default Login;
