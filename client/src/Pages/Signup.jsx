import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      // await axios.post('/api/signup', { name, email, password });
      // alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="background-overlay"></div>
      <div className="signup-form">
        <h2 className="title">Sign Up</h2>
        <form onSubmit={handleSignup} className="form">
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <label className="label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input"
          />
          <button
            type="submit"
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
      <style jsx>{`
        .signup-container {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to right, #6b46c1, #63b3ed);
          padding: 1rem;
        }
        .background-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background-color: black;
        }
        .signup-form {
          position: relative;
          width: 100%;
          max-width: 400px;
          background: rgba(31, 41, 55, 0.8);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: transform 1s;
        }
        .signup-form:hover {
          transform: scale(1.05);
        }
        .title {
          font-family: 'Handjet', sans-serif;
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
          placeholder-color: #a0aec0;
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
        .submit-button.loading {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </motion.div>
  );
};

export default Signup;
