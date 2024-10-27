import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  UserPlus,
  MapPin,
  Briefcase,
  Phone,
  User,
  Mail,
  Clock,
} from "lucide-react";
import { db } from "../../Firebase";
import Navbar from "../../Components/Navbar";

const styles = `
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
  }

  .bg-gradient {
    background: linear-gradient(135deg, #065666 0%, #001F3F 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    max-width: 600px;
    width: 100%;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .container:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  }

  .header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .header h1 {
    font-size: 2.5rem;
    color: #065666;
    margin-bottom: 0.5rem;
  }

  .header p {
    color: #7f8ea3;
    font-size: 1rem;
  }

  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-group input {
    width: 85%;
    padding: 1rem 1rem 1rem 2.5rem;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    font-size: 1rem;
    transition: border-color 0.3s;
  }

  .form-group input:focus {
    border-color: #065666;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 129, 167, 0.3);
  }

  .form-group .icon {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: #065666;
  }

  .form-group input::placeholder {
    color: #a0aec0;
  }

  .error-message {
    color: #e53e3e;
    font-size: 0.875rem;
    margin-top: -1rem;
    margin-bottom: 1.5rem;
  }

  .submit-button {
    width: 100%;
    background: linear-gradient(to right, #065666, #0099cc);
    color: white;
    font-size: 1.125rem;
    padding: 1rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s, transform 0.3s;
  }

  .submit-button:disabled {
    background: #b3c6d1;
    cursor: not-allowed;
  }

  .submit-button:hover:not(:disabled) {
    background: linear-gradient(to right, #008db8, #05748c);
    transform: translateY(-2px);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const AddLawyer = () => {
  const [lawyerData, setLawyerData] = useState({
    name: "",
    location: "",
    specialization: "",
    contact: "",
    email: "",
    yearsOfExperience: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Apply the gradient background for this component
    document.body.classList.add("bg-gradient");

    return () => {
      document.body.classList.remove("bg-gradient");
    };
  }, []);

  const handleChange = (e) => {
    setLawyerData({ ...lawyerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(lawyerData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Years of experience validation
      if (parseInt(lawyerData.yearsOfExperience) < 0) {
        throw new Error("Years of experience cannot be negative");
      }

      await addDoc(collection(db, "lawyers"), lawyerData);
      alert("Lawyer added successfully");
      setLawyerData({
        name: "",
        location: "",
        specialization: "",
        contact: "",
        email: "",
        yearsOfExperience: "",
      });
    } catch (error) {
      setError(error.message);
      alert(error.message || "Error adding lawyer");
      console.error("Error adding lawyer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="header">
          <h1>Add New Lawyer</h1>
          <p>Register a legal professional to our network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lawyer's Full Name */}
          <div className="form-group">
            <User className="icon h-5 w-5" />
            <input
              type="text"
              name="name"
              placeholder="Lawyer's Full Name"
              value={lawyerData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <MapPin className="icon h-5 w-5" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={lawyerData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Specialization */}
          <div className="form-group">
            <Briefcase className="icon h-5 w-5" />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={lawyerData.specialization}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact Information */}
          <div className="form-group">
            <Phone className="icon h-5 w-5" />
            <input
              type="text"
              name="contact"
              placeholder="Contact Information"
              value={lawyerData.contact}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <Mail className="icon h-5 w-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={lawyerData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Years of Experience */}
          <div className="form-group">
            <Clock className="icon h-5 w-5" />
            <input
              type="number"
              name="yearsOfExperience"
              placeholder="Years of Experience"
              value={lawyerData.yearsOfExperience}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="submit-button">
            <div className="flex items-center justify-center">
              <UserPlus className="w-5 h-5 mr-2" />
              {isLoading ? "Adding..." : "Add Lawyer"}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLawyer;
