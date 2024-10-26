import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Users,
  ExternalLink,
  BookmarkPlus,
  MoreHorizontal,
} from "lucide-react";
import Navbar from "../../Components/Navbar";

// Add the style tag before the component
const styles = `
  /* Base styles */
  .min-h-screen {
    min-height: 100vh;
  }

  .bg-gray-50 {
    background-color: rgb(249, 250, 251);
  }

  /* Navigation */
  .bg-white {
    background-color: white;
  }

  .border-b {
    border-bottom-width: 1px;
  }

  .border-gray-200 {
    border-color: rgb(229, 231, 235);
  }

  .fixed {
    position: fixed;
  }

  .w-full {
    width: 100%;
  }

  .top-0 {
    top: 0;
  }

  .z-50 {
    z-index: 50;
  }

  .max-w-7xl {
    max-width: 80rem;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .flex {
    display: flex;
  }

  .items-center {
    align-items: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .h-14 {
    height: 3.5rem;
  }

  .gap-2 {
    gap: 0.5rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .font-bold {
    font-weight: 700;
  }

  .text-blue-600 {
    color: rgb(37, 99, 235);
  }

  .flex-1 {
    flex: 1 1 0%;
  }

  .max-w-xl {
    max-width: 36rem;
  }

  /* Search inputs */
  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .left-3 {
    left: 0.75rem;
  }

  .top-1/2 {
    top: 50%;
  }

  .transform {
    transform: translate(0, -50%);
  }

  .text-gray-400 {
    color: rgb(156, 163, 175);
  }

  .h-4 {
    height: 1rem;
  }

  .w-4 {
    width: 1rem;
  }

  .pl-10 {
    padding-left: 2.5rem;
  }

  .pr-4 {
    padding-right: 1rem;
  }

  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .border {
    border-width: 1px;
  }

  .border-gray-300 {
    border-color: rgb(209, 213, 219);
  }

  .rounded-md {
    border-radius: 0.375rem;
  }

  .w-48 {
    width: 12rem;
  }

  /* Buttons */
  .gap-4 {
    gap: 1rem;
  }

  .text-gray-500 {
    color: rgb(107, 114, 128);
  }

  .hover\:text-gray-700:hover {
    color: rgb(55, 65, 81);
  }

  .bg-blue-600 {
    background-color: rgb(37, 99, 235);
  }

  .text-white {
    color: white;
  }

  .rounded-full {
    border-radius: 9999px;
  }

  .hover\:bg-blue-700:hover {
    background-color: rgb(29, 78, 216);
  }

  /* Filter bar */
  .top-14 {
    top: 3.5rem;
  }

  .z-40 {
    z-index: 40;
  }

  .h-12 {
    height: 3rem;
  }

  .font-medium {
    font-weight: 500;
  }

  .hover\:bg-gray-100:hover {
    background-color: rgb(243, 244, 246);
  }

  /* Main content */
  .pt-32 {
    padding-top: 8rem; /* Adjusted for the navbar */
  }

  .pb-8 {
    padding-bottom: 2rem;
  }

  .gap-8 {
    gap: 2rem;
  }

  .w-2/5 {
    width: 40%;
  }

  .space-y-4 > * + * {
    margin-top: 1rem;
  }

  .p-4 {
    padding: 1rem;
  }

  .shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .text-lg {
    font-size: 1.125rem;
  }

  /* Lawyer cards */
  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .border-t {
    border-top-width: 1px;
  }

  .hover\:bg-gray-50:hover {
    background-color: rgb(249, 250, 251);
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .h-12 {
    height: 3rem;
  }

  .w-12 {
    width: 3rem;
  }

  .bg-blue-100 {
    background-color: rgb(219, 234, 254);
  }

  .justify-center {
    justify-content: center;
  }

  .text-gray-600 {
    color: rgb(75, 85, 99);
  }

  .mt-2 {
    margin-top: 0.5rem;
  }

  .text-xs {
    font-size: 0.75rem;
  }

  .h-3 {
    height: 0.75rem;
  }

  .w-3 {
    width: 0.75rem;
  }

  /* Details panel */
  .p-6 {
    padding: 1.5rem;
  }

  .sticky {
    position: sticky;
  }

  .top-32 {
    top: 8rem;
  }

  .items-start {
    align-items: flex-start;
  }

  .mb-6 {
    margin-bottom: 1.5rem;
  }

  .text-xl {
    font-size: 1.25rem;
  }

  .mb-1 {
    margin-bottom: 0.25rem;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .h-5 {
    height: 1.25rem;
  }

  .w-5 {
    width: 1.25rem;
  }

  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .border-blue-600 {
    border-color: rgb(37, 99, 235);
  }

  .hover\:bg-blue-50:hover {
    background-color: rgb(239, 246, 255);
  }

  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }

  /* Practice area tags */
  .flex-wrap {
    flex-wrap: wrap;
  }

  .bg-gray-100 {
    background-color: rgb(243, 244, 246);
  }

  .text-gray-700 {
    color: rgb(55, 65, 81);
  }

  /* Focus states */
  .focus\:outline-none:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  .focus\:ring-1:focus {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  }

  .focus\:ring-blue-500:focus {
    --tw-ring-color: rgb(59, 130, 246);
  }
`;

// Add this line right after your styles constant
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const LawyerSearch = () => {
  const [search, setSearch] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      const lawyersCollection = collection(db, "lawyers");
      const q = query(
        lawyersCollection,
        where("location", "==", locationFilter)
      );
      const querySnapshot = await getDocs(q);
      const lawyersData = querySnapshot.docs.map((doc) => doc.data());
      setLawyers(lawyersData);
      setLoading(false);
    };

    if (locationFilter) {
      fetchLawyers();
    } else {
      setLoading(false); // Set loading to false if no location filter is applied
    }
  }, [locationFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-32 mt-14 pb-8">
        {" "}
        {/* Add mt-14 for margin-top */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            {/* Results List */}
            <div className="w-2/5 space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">
                    Legal professionals in your area
                  </h2>
                  <button className="text-sm text-gray-500">Set alert</button>
                </div>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  lawyers.map((lawyer) => (
                    <div
                      key={lawyer.name}
                      className="py-4 border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <div className="h-12 w-12 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-medium">
                          {lawyer.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-blue-600">
                            {lawyer.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {lawyer.specialization}
                          </p>
                          <p className="text-sm text-gray-500">
                            {lawyer.location}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>Active now</span>
                            <span>•</span>
                            <span>
                              {Math.floor(Math.random() * 100)} applicants
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Details Panel */}
            <div className="flex-1">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-32">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-xl font-medium mb-1">
                      Legal Professional
                    </h1>
                    <p className="text-sm text-gray-600 mb-2">ABC Law Firm</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> New York, NY
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" /> Full-time
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <BookmarkPlus className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreHorizontal className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mb-6">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2">
                    Contact Now <ExternalLink className="h-4 w-4" />
                  </button>
                  <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50">
                    Save
                  </button>
                </div>

                <div className="space-y-6">
                  <section>
                    <h2 className="font-medium mb-2">About</h2>
                    <p className="text-sm text-gray-600">
                      Experienced legal professional specializing in corporate
                      law with a proven track record of handling complex cases
                      and providing strategic legal counsel.
                    </p>
                  </section>

                  <section>
                    <h2 className="font-medium mb-2">Practice Areas</h2>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Corporate Law",
                        "Mergers & Acquisitions",
                        "Contract Law",
                      ].map((area) => (
                        <span
                          key={area}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LawyerSearch;
