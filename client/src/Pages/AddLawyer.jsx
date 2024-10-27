import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { UserPlus, MapPin, Briefcase, Phone, User, Mail, Clock } from "lucide-react";
import { db } from "../../Firebase";

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
    // Background transition for smoother effect
    document.body.style.transition = "background 0.5s ease";
    document.body.style.background =
      "linear-gradient(135deg, #001F3F 0%, #065666 50%, #001F3F 100%)";
    document.body.style.minHeight = "100vh";

    return () => {
      document.body.style.background = "";
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
    <div className="min-h-screen w-full py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Add New Lawyer
          </h1>
          <p className="text-gray-200 text-lg font-light">
            Register a legal professional to our network
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lawyer's Full Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-teal-600" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Lawyer's Full Name"
                value={lawyerData.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-4 border-gray-300 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Location */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-teal-600" />
              </div>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={lawyerData.location}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-4 border-gray-300 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Specialization */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-teal-600" />
              </div>
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={lawyerData.specialization}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-4 border-gray-300 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Contact Information */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-teal-600" />
              </div>
              <input
                type="text"
                name="contact"
                placeholder="Contact Information"
                value={lawyerData.contact}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-4 border-gray-300 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-teal-600" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={lawyerData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-4 border-gray-300 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 bg-transparent"
                required
              />
            </div>

            {/* Years of Experience */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-teal-600" />
              </div>
              <input
                type="number"
                name="yearsOfExperience"
                placeholder="Years of Experience"
                value={lawyerData.yearsOfExperience}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-4 border-gray-300 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 bg-transparent"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2 animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 px-6 rounded-lg text-lg font-medium 
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-teal-600 hover:to-cyan-700'} 
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-center">
                <UserPlus className="w-5 h-5 mr-2" />
                {isLoading ? 'Adding...' : 'Add Lawyer'}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLawyer;
