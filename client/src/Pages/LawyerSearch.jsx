import React, { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import {
  BookmarkPlus,
  MoreHorizontal,
  Clock,
  MapPin,
  Mail,
  Phone,
  Clock as Experience,
  User,
  Briefcase,
} from "lucide-react";
import Navbar from "../../Components/Navbar";

const styles = `
/* Base Styles */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
}

.bg-gradient {
  background: linear-gradient(135deg, #1a0033 0%, #000000 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.navbar {
  height: 80px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

/* Search Container */
.search-container {
  max-width: 800px;
  width: 100%;
  margin: 2rem auto;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 0.75rem; /* Space between input and button */
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1.1rem;
  background-color: #f7f7f7;
  transition: background-color 0.3s ease;
}

.search-input:focus {
  background-color: #e6e6e6;
}

.search-button {
  background-color: #6b46c1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease;
}

.search-button:hover {
  background-color: #805ad5;
  transform: translateY(-2px);
}

/* Cards Container */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem; /* Space between cards */
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  justify-items: center;
}

/* Card Styling */
.lawyer-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s ease;
}

.lawyer-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive Grid */
@media (min-width: 1024px) {
  .cards-container {
    grid-template-columns: repeat(4, 1fr); /* Max 4 elements per row */
  }
}

@media (min-width: 600px) and (max-width: 1023px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr); /* 2 elements per row */
  }
}

@media (max-width: 599px) {
  .cards-container {
    grid-template-columns: 1fr; /* 1 element per row on small screens */
  }
}

`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const LawyerSearch = () => {
  const [search, setSearch] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true);
      try {
        const lawyersCollection = collection(db, "lawyers");
        const q = query(lawyersCollection);
        const querySnapshot = await getDocs(q);
        const lawyersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLawyers(lawyersData);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const lawyersCollection = collection(db, "lawyers");
      const searchQuery = search.toLowerCase();
      const lawyersData = await getDocs(lawyersCollection);
      const filteredLawyers = lawyersData.docs.filter((doc) => {
        const lawyerData = doc.data();
        for (const key in lawyerData) {
          if (String(lawyerData[key]).toLowerCase().includes(searchQuery)) {
            return true;
          }
        }
        return false;
      });
      setLawyers(filteredLawyers.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error searching lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient">
      <div className="fixed top-0 w-full z-50 navbar">
        <Navbar />
      </div>

      <div className="min-h-screen pt-[80px]">
        <main className="container mx-auto px-4 py-8">
          <div className="search-container">
            <form onSubmit={handleSearch} className="w-full">
              <div className="search-bar">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for a lawyer by name, specialty, location, or bio..."
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="cards-container">
            {lawyers.map((lawyer) => (
              <div key={lawyer.id} className="lawyer-card">
                <div className="lawyer-header">
                  <div className="lawyer-avatar">{lawyer.name[0]}</div>
                  <div className="lawyer-info">
                    <h2 className="lawyer-name">{lawyer.name}</h2>
                    <p className="lawyer-specialty">
                      {lawyer.specialization} lawyer
                    </p>
                  </div>
                </div>

                <div className="info-row">
                  <span className="info-title">Location:</span>
                  <MapPin className="info-icon" />
                  <p>{lawyer.location}</p>
                </div>

                <div className="info-row">
                  <span className="info-title">Email:</span>
                  <Mail className="info-icon" />
                  <p>{lawyer.email}</p>
                </div>

                <div className="info-row">
                  <span className="info-title">Phone:</span>
                  <Mail className="info-icon" />
                  <p>{lawyer.contact}</p>
                </div>

                <div className="info-row">
                  <span className="info-title">Years of Experience:</span>
                  <Experience className="info-icon" />
                  <p>{lawyer.yearsOfExperience}</p>
                </div>

                <div className="card-actions">
                  <button className="action-button">
                    <BookmarkPlus />
                  </button>
                  <button className="action-button">
                    <MoreHorizontal />
                  </button>
                </div>
              </div>
            ))}

            {loading && (
              <div className="loading">
                <Clock className="loading-icon" />
                <span>Loading lawyers...</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LawyerSearch;
