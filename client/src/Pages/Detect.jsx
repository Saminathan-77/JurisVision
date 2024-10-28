import React, { useState } from "react";
import Navbar from "../../Components/Navbar";

const Detect = () => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setOutput("Detecting AI, please wait...");

    const formData = new FormData();
    formData.append("document", event.target.document.files[0]);

    try {
      const response = await fetch("http://localhost:8000/detectai", {
        // Ensure this matches your backend URL
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        
        // Assuming the response contains a detection result
        setOutput(
          <div>
            <strong>Detection Result:</strong> {data.result}
            <p>{data.description}</p>
          </div>
        );
      } else {
        setOutput("There was an error processing the request. Please try again.");
      }
    } catch (error) {
      setOutput("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>AI Detection</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="document">
            Upload Document:
          </label>
          <input
            type="file"
            id="document"
            name="document"
            accept=".pdf"
            required
            style={styles.fileInput}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Detecting..." : "Detect AI"}
          </button>
        </form>

        <div style={styles.output}>{output}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    backgroundColor: "#f4f4f9",
    padding: "20px",
  },
  heading: {
    color: "#333333",
    textAlign: "center",
  },
  form: {
    width: "90%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginTop: "10px",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
    borderRadius: "5px",
  },
  output: {
    marginTop: "20px",
    width: "90%",
    maxWidth: "600px",
  },
};

export default Detect;
