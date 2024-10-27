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
  /* Base styles */
  html, body {
    margin: 0;
    height: 100%;
    width: 100%;
  }

  .min-h-screen {
    min-height: 100vh;
  }

  /* Dark Gradient Background */
  .bg-gradient {
    background: linear-gradient(135deg, #1a0033 0%, #000000 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  /* Navbar */
  .navbar {
    height: 80px;
  }

  /* Search Bar */
  .search-container {
    max-width: 600px;
    margin: 0 auto 2rem auto;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 12px;
    padding: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .search-input {
    border: none;
    outline: none;
    padding: 0.75rem;
    border-radius: 8px;
    flex: 1;
    font-size: 1rem;
  }

  .search-button {
    background-color: #6b46c1;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  .search-button:hover {
    background-color: #805ad5;
    transform: translateY(-1px);
  }

  /* Lawyer Cards */
  .cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1rem;
  }

  .lawyer-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s forwards;
  }

  .lawyer-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }

  .lawyer-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .lawyer-avatar {
    width: 50px;
    height: 50px;
    background-color: #6b46c1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 0.75rem;
  }

  .lawyer-info {
    flex: 1;
  }

  .lawyer-name {
    font-size: 1.1rem;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }

  .lawyer-specialty {
    color: #718096;
    font-size: 0.75rem;
  }

  .info-row {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    color: #4a5568;
  }

  .info-title {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .info-icon {
    margin-right: 0.5rem;
    color: #6b46c1;
  }

  .card-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e2e8f0;
  }

  .action-button {
    padding: 0.25rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .action-button:hover {
    background-color: #f7fafc;
    transform: scale(1.1);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Loading Styles */
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
    padding: 2rem;
  }

  .loading-icon {
    animation: spin 1s linear infinite;
    margin-right: 0.75rem;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
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
