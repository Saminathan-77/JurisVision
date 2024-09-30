import React, { useState, useRef, useEffect } from 'react';

const Home = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleAnalyze = async () => {
    if (text.trim()) {
      setIsAnalyzing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalysis(`Patent-related analysis for: "${text}"`);
      setIsAnalyzing(false);
    } else {
      setAnalysis('Please enter text for analysis.');
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const userMessage = chatInput;
      setChatHistory(prev => [...prev, { user: userMessage }]);
      setChatInput('');
      setIsTyping(true);

      await new Promise(resolve => setTimeout(resolve, 1000));
      const botResponse = getBotResponse(userMessage);
      
      setChatHistory(prev => [
        ...prev.slice(0, -1),
        { user: userMessage, bot: botResponse }
      ]);
      setIsTyping(false);
    }
  };

  const getBotResponse = (input) => {
    const normalizedInput = input.toLowerCase();
    if (normalizedInput.includes('patent')) {
      return "I can help you analyze patents. Please provide the details of the patent you'd like me to examine.";
    } else if (normalizedInput.includes('legal advice')) {
      return "For legal advice, please specify your query. Remember, I'm an AI assistant and can't replace professional legal counsel.";
    } else if (normalizedInput.includes('hello')) {
      return "Hello! I'm your AI legal assistant. How can I assist you today with patent analysis or legal queries?";
    } else if (normalizedInput.includes('help')) {
      return "I'm here to help! You can ask me about patent analysis, general legal concepts, or how to use this platform. What specific area do you need assistance with?";
    } else {
      return "I'm not sure I understood that completely. Could you please rephrase your question or provide more context about what you're looking for?";
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom right, #EBF4FF, #E0E7FF)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '1.5rem 2rem'
        }}>
          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#3730A3' }}>JurisVision</h1>
            <ul style={{ display: 'flex', gap: '2rem' }}>
              <li><a href="#analysis" style={{ color: '#4F46E5', textDecoration: 'none', fontSize: '1.1rem' }}>Patent Analysis</a></li>
              <li><a href="#chat" style={{ color: '#4F46E5', textDecoration: 'none', fontSize: '1.1rem' }}>AI Chatbot</a></li>
            </ul>
          </nav>
        </header>

        <main style={{
          flex: 1,
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '3rem 2rem'
        }}>
          <section style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#312E81', marginBottom: '1.5rem' }}>Legal AI Assistant</h1>
            <p style={{ fontSize: '1.5rem', color: '#4338CA', maxWidth: '800px', margin: '0 auto' }}>Get expert legal advice and patent analysis with our advanced AI chatbot.</p>
          </section>

          <section id="analysis" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#312E81', marginBottom: '2rem' }}>Patent Analysis</h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
              <textarea 
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #818CF8',
                  borderRadius: '0.75rem',
                  marginBottom: '1.5rem',
                  resize: 'vertical',
                  minHeight: '150px',
                  fontSize: '1rem',
                  lineHeight: '1.5'
                }}
                placeholder="Enter patent text or description to analyze..." 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
              />
              <button 
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s'
                }}
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span className="animate-spin" style={{ marginRight: '0.5rem', display: 'inline-block', width: '1rem', height: '1rem', border: '2px solid #fff', borderBottomColor: 'transparent', borderRadius: '50%' }}></span>
                    Analyzing...
                  </>
                ) : 'Analyze Patent'}
              </button>
              {analysis && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  backgroundColor: '#EEF2FF',
                  borderRadius: '0.75rem',
                  border: '1px solid #C7D2FE'
                }} className="animate-fade-in">
                  <p style={{ color: '#312E81', fontSize: '1rem', lineHeight: '1.5' }}>{analysis}</p>
                </div>
              )}
            </div>
          </section>

          <section id="chat">
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#312E81', marginBottom: '2rem' }}>Chat with Our Legal AI</h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
              <div style={{
                height: '400px',
                overflowY: 'auto',
                marginBottom: '1.5rem',
                padding: '1.5rem',
                backgroundColor: '#EEF2FF',
                borderRadius: '0.75rem',
                border: '1px solid #C7D2FE'
              }}>
                {chatHistory.map((msg, index) => (
                  <div key={index} style={{ marginBottom: '1.5rem' }} className="animate-fade-in">
                    {msg.user && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
                        <p style={{ backgroundColor: '#C7D2FE', color: '#312E81', borderRadius: '1rem', padding: '0.75rem 1rem', maxWidth: '80%', fontSize: '1rem', lineHeight: '1.5' }}>{msg.user}</p>
                      </div>
                    )}
                    {msg.bot && (
                      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.75rem' }}>
                        <p style={{ backgroundColor: 'white', color: '#312E81', borderRadius: '1rem', padding: '0.75rem 1rem', maxWidth: '80%', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', fontSize: '1rem', lineHeight: '1.5' }}>{msg.bot}</p>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', color: '#4F46E5' }}>
                    <span className="animate-spin" style={{ marginRight: '0.5rem', display: 'inline-block', width: '1rem', height: '1rem', border: '2px solid #4F46E5', borderBottomColor: 'transparent', borderRadius: '50%' }}></span>
                    <p style={{ fontSize: '1rem' }}>AI is typing...</p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleChatSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  style={{
                    flex: 1,
                    padding: '1rem',
                    border: '2px solid #818CF8',
                    borderRadius: '9999px',
                    marginRight: '1rem',
                    fontSize: '1rem'
                  }}
                  placeholder="Ask about patents or legal advice..." 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)} 
                />
                <button 
                  type="submit" 
                  style={{
                    padding: '1rem',
                    backgroundColor: '#4F46E5',
                    color: 'white',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                  }}
                  disabled={isTyping}
                >
                  {isTyping ? (
                    <span className="animate-spin" style={{ display: 'inline-block', width: '1rem', height: '1rem', border: '2px solid #fff', borderBottomColor: 'transparent', borderRadius: '50%' }}></span>
                  ) : 'Send'}
                </button>
              </form>
            </div>
          </section>
        </main>

        <footer style={{
          backgroundColor: '#312E81',
          padding: '2rem',
          marginTop: '4rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
            color: '#E0E7FF'
          }}>
            <p style={{ fontSize: '1rem' }}>© 2024 JurisVision. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;