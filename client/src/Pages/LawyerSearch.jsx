import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Search, MapPin, Briefcase, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase';

const LawyerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lawyers, setLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #000000 0%, #1a0033 50%, #000000 100%)';
    document.body.style.minHeight = '100vh';
    fetchLawyers();
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const fetchLawyers = async (search = '') => {
    setIsLoading(true);
    try {
      const lawyersCollection = collection(db, 'lawyers');
      const q = search ? query(lawyersCollection, where('name', '==', search)) : lawyersCollection;
      const querySnapshot = await getDocs(q);
      const lawyerList = querySnapshot.docs.map((doc) => doc.data());
      setLawyers(lawyerList);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLawyers(searchTerm);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Find Trusted Lawyers
          </h1>
          <p className="text-white text-xl max-w-2xl mx-auto font-light">
            Connect with experienced legal professionals in your area
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or specialization"
              className="w-full pl-12 pr-4 py-4 rounded-l-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-purple-600 text-white rounded-r-lg text-lg font-medium hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Search
            </button>
          </div>
        </form>

        {/* Add Lawyer Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/add-lawyer')}
            className="px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-medium hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add a Lawyer
          </button>
        </div>

        {/* Lawyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center text-white text-xl">Loading...</div>
          ) : lawyers.length ? (
            lawyers.map((lawyer, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{lawyer.name}</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                    <span className="text-lg">{lawyer.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-5 h-5 mr-3 text-purple-600" />
                    <span className="text-lg">{lawyer.specialization}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-purple-600" />
                    <span className="text-lg">{lawyer.contact}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    Contact Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-white text-xl">
              No lawyers found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyerSearch;
