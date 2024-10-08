import React from 'react';
import AboutUs from './Pages/AboutUs';
import ChatBot from './Pages/ChatBot';
import PatentAnalysis from './Pages/PatentAnalysis';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/patentanalysis" element={<PatentAnalysis />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
