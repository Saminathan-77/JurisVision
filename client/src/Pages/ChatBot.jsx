import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, user: true }]);
      setInput("");
      // Mock API response - replace this with actual AI interaction logic
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: `Response to: ${input}`, user: false },
        ]);
      }, 1000);
    }
  };

  const styles = {
    container: {
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f0ff", // Light purple background
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    heading: {
      color: "#6a5acd", // Slate blue
      marginBottom: "1.5rem",
      transition: "color 0.3s",
    },
    chatbox: {
      border: "1px solid #d3d3d3",
      borderRadius: "5px",
      maxHeight: "500px",
      overflowY: "auto",
      padding: "1rem",
      width: "100%",
      maxWidth: "600px",
      backgroundColor: "white",
    },
    message: {
      padding: "0.5rem",
      borderRadius: "5px",
      margin: "0.5rem 0",
      maxWidth: "80%",
    },
    userMessage: {
      backgroundColor: "#6a5acd", // Slate blue
      color: "white",
      alignSelf: "flex-end",
    },
    aiMessage: {
      backgroundColor: "#e6e6fa", // Lavender
      color: "black",
      alignSelf: "flex-start",
    },
    inputForm: {
      display: "flex",
      marginTop: "1rem",
      width: "100%",
      maxWidth: "600px",
    },
    inputBox: {
      flex: 1,
      padding: "0.75rem",
      borderRadius: "5px",
      border: "1px solid #d3d3d3",
      marginRight: "0.5rem",
      fontSize: "1rem",
      transition: "border-color 0.3s",
    },
    inputBoxFocus: {
      borderColor: "#6a5acd", // Slate blue
      outline: "none",
    },
    sendButton: {
      backgroundColor: "#6a5acd", // Slate blue
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "5px",
      border: "none",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    sendButtonHover: {
      backgroundColor: "#483d8b", // Dark slate blue
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h2 style={styles.heading}>Chatbot</h2>
      <div style={styles.chatbox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.user ? styles.userMessage : styles.aiMessage),
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={styles.inputBox}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor =
              styles.inputBoxFocus.borderColor)
          }
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d3d3d3")}
        />
        <button
          type="submit"
          style={styles.sendButton}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.sendButtonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.sendButton.backgroundColor)
          }
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
