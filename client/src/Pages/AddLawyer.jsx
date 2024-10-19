import React, { useState, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { UserPlus, MapPin, Briefcase, Phone, User } from 'lucide-react';
import { db } from '../Firebase';

const AddLawyer = () => {
  const [lawyerData, setLawyerData] = useState({
    name: '',
    location: '',
    specialization: '',
    contact: ''
  });

  useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #001F3F 0%, #065666 50%, #001F3F 100%)';
    document.body.style.minHeight = '100vh';
    
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleChange = (e) => {
    setLawyerData({ ...lawyerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'lawyers'), lawyerData);
      alert("Lawyer added successfully");
      setLawyerData({ name: '', location: '', specialization: '', contact: '' });
    } catch (error) {
      console.error("Error adding lawyer:", error);
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

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="block w-full pl-10 pr-3 py-4 border-gray-200 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

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
                className="block w-full pl-10 pr-3 py-4 border-gray-200 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

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
                className="block w-full pl-10 pr-3 py-4 border-gray-200 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

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
                className="block w-full pl-10 pr-3 py-4 border-gray-200 rounded-lg border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 px-6 rounded-lg text-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Add Lawyer
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLawyer;