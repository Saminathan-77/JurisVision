import React, { useState } from 'react';
import Navbar from "../../Components/Navbar";

const PatentAnalysis = () => {
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setOutput("Calculating similarity, please wait...");

        const formData = new FormData();
        formData.append("document1", event.target.document1.files[0]);
        formData.append("document2", event.target.document2.files[0]);

        try {
            const response = await fetch("/analyze_similarity", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const data = await response.json();

                const overallScore = ((data.tfidf_similarity + data.lsi_similarity + data.lda_similarity + data.doc2vec_similarity) / 4) * 100;

                setOutput(
                    <div>
                        <div><strong>TF-IDF Similarity:</strong> {data.tfidf_similarity.toFixed(4)}</div>
                        <p>This score represents the similarity based on term frequency-inverse document frequency. High values indicate similar vocabulary and term distribution.</p>

                        <div><strong>LSI Similarity:</strong> {data.lsi_similarity.toFixed(4)}</div>
                        <p>This score measures similarity using Latent Semantic Indexing, capturing underlying themes and concepts. A higher score indicates more shared topics.</p>

                        <div><strong>LDA Similarity:</strong> {data.lda_similarity.toFixed(4)}</div>
                        <p>This score represents similarity based on Latent Dirichlet Allocation, assessing topic distribution in the documents. Higher values mean more common topics.</p>

                        <div><strong>Doc2Vec Similarity:</strong> {data.doc2vec_similarity.toFixed(4)}</div>
                        <p>This score is calculated using Doc2Vec embeddings, which capture semantic and contextual information. A higher score indicates similar document context.</p>

                        <div><strong>Overall Similarity Score:</strong> {overallScore.toFixed(2)}%</div>
                        <p>This is the composite similarity score, representing an average of all individual metrics. It provides a final similarity percentage between the documents.</p>
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
            <h1 style={styles.heading}>Patent Document Similarity Analysis</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label} htmlFor="document1">Upload Document 1:</label>
                <input type="file" id="document1" name="document1" accept=".pdf" required style={styles.fileInput} />

                <label style={styles.label} htmlFor="document2">Upload Document 2:</label>
                <input type="file" id="document2" name="document2" accept=".pdf" required style={styles.fileInput} />

                <button type="submit" style={styles.button} disabled={loading}>{loading ? "Analyzing..." : "Analyze Similarity"}</button>
            </form>

            <div style={styles.output}>
                {output}
            </div>
        </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        backgroundColor: '#f4f4f9',
        padding: '20px'
    },
    heading: {
        color: '#333333',
        textAlign: 'center'
    },
    form: {
        width: '90%',
        maxWidth: '600px',
        backgroundColor: '#ffffff',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px'
    },
    label: {
        display: 'block',
        fontWeight: 'bold',
        marginTop: '10px'
    },
    fileInput: {
        width: '100%',
        padding: '10px',
        margin: '10px 0'
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '15px',
        borderRadius: '5px'
    },
    output: {
        marginTop: '20px',
        width: '90%',
        maxWidth: '600px'
    }
};

export default PatentAnalysis;
