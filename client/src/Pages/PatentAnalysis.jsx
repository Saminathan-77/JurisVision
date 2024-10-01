import React, { useState } from 'react';

const PatentAnalysis = () => {
  const [patent, setPatent] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock API call - replace this with actual logic to search for similar patents
    const mockResults = [
      { title: 'Patent A', similarity: 90 },
      { title: 'Patent B', similarity: 85 },
      { title: 'Patent C', similarity: 80 },
    ];
    setResults(mockResults);
  };

  const styles = {
    container: {
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f0ff', // Light purple background
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    heading: {
      color: '#6a5acd', // Slate blue
      marginBottom: '1.5rem',
      transition: 'color 0.3s',
    },
    textarea: {
      width: '100%',
      maxWidth: '600px',
      padding: '1rem',
      borderRadius: '5px',
      border: '1px solid #d3d3d3',
      marginBottom: '1rem',
      fontSize: '1rem',
      transition: 'border-color 0.3s',
    },
    textareaFocus: {
      borderColor: '#6a5acd', // Slate blue
      outline: 'none',
    },
    button: {
      backgroundColor: '#6a5acd', // Slate blue
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '5px',
      border: 'none',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#483d8b', // Dark slate blue
    },
    resultsContainer: {
      marginTop: '2rem',
      textAlign: 'center',
    },
    resultsList: {
      listStyleType: 'none',
      padding: 0,
    },
    resultItem: {
      padding: '0.5rem 0',
      borderBottom: '1px solid #d3d3d3',
      transition: 'background-color 0.3s',
    },
    resultItemHover: {
      backgroundColor: '#e6e6fa', // Lavender
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Patent Analysis</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          style={styles.textarea}
          value={patent}
          onChange={(e) => setPatent(e.target.value)}
          placeholder="Enter patent description..."
          rows="5"
        />
        <button 
          type="submit" 
          style={styles.button} 
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Analyze Patent
        </button>
      </form>
      {results && (
        <div style={styles.resultsContainer}>
          <h3>Similar Patents Found:</h3>
          <ul style={styles.resultsList}>
            {results.map((item, index) => (
              <li key={index} style={styles.resultItem} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.resultItemHover.backgroundColor)} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}>
                <strong>{item.title}</strong> - Similarity: {item.similarity}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatentAnalysis;
