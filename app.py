from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import nltk
from gensim.models import TfidfModel, LsiModel, LdaModel, Doc2Vec
from gensim.corpora import Dictionary
from gensim.models.doc2vec import TaggedDocument
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize import word_tokenize
import numpy as np
from typing import List
import os
nltk.download('punkt_tab', quiet=True)
app = FastAPI()

# CORS settings
origins = [
    "http://localhost:5173",  # Update this to your frontend URL if different
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to extract text from PDF using pdfplumber
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ''  # Handle None case
    return text

# Function to preprocess the text
def preprocess(doc):
    tokens = word_tokenize(doc.lower())
    tokens = [word for word in tokens if word.isalpha()]
    return tokens

def vector_to_dense(vector, num_topics):
    dense_vector = np.zeros(num_topics)
    for index, value in vector:
        dense_vector[index] = value
    return dense_vector

# Similarity analysis functions
def tfidf_similarity(doc1, doc2):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([doc1, doc2])
    similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])
    return similarity[0][0]

def lsi_similarity(documents, num_topics=2):
    dictionary = Dictionary(documents)
    corpus = [dictionary.doc2bow(doc) for doc in documents]
    tfidf_model = TfidfModel(corpus)
    corpus_tfidf = tfidf_model[corpus]

    lsi_model = LsiModel(corpus_tfidf, id2word=dictionary, num_topics=num_topics)
    doc1_lsi = vector_to_dense(lsi_model[tfidf_model[dictionary.doc2bow(documents[0])]], num_topics)
    doc2_lsi = vector_to_dense(lsi_model[tfidf_model[dictionary.doc2bow(documents[1])]], num_topics)

    similarity = cosine_similarity([doc1_lsi], [doc2_lsi])
    return similarity[0][0]

def lda_similarity(documents, num_topics=2):
    dictionary = Dictionary(documents)
    corpus = [dictionary.doc2bow(doc) for doc in documents]
    tfidf_model = TfidfModel(corpus)
    corpus_tfidf = tfidf_model[corpus]

    lda_model = LdaModel(corpus_tfidf, id2word=dictionary, num_topics=num_topics)
    doc1_lda = vector_to_dense(lda_model[tfidf_model[dictionary.doc2bow(documents[0])]], num_topics)
    doc2_lda = vector_to_dense(lda_model[tfidf_model[dictionary.doc2bow(documents[1])]], num_topics)

    similarity = cosine_similarity([doc1_lda], [doc2_lda])
    return similarity[0][0]

def doc2vec_similarity(documents):
    tagged_docs = [TaggedDocument(words=doc, tags=[str(i)]) for i, doc in enumerate(documents)]
    doc2vec_model = Doc2Vec(tagged_docs, vector_size=50, window=2, min_count=1, epochs=100)

    doc1_vec = doc2vec_model.infer_vector(documents[0])
    doc2_vec = doc2vec_model.infer_vector(documents[1])

    similarity = cosine_similarity([doc1_vec], [doc2_vec])
    return similarity[0][0]

@app.post("/patentanalysis")
async def analyze_similarity(document1: UploadFile = File(...), document2: UploadFile = File(...)):
    # Save the uploaded files temporarily
    doc1_path = f"temp_{document1.filename}"
    doc2_path = f"temp_{document2.filename}"
    
    with open(doc1_path, "wb") as f1, open(doc2_path, "wb") as f2:
        f1.write(await document1.read())
        f2.write(await document2.read())

    # Load and preprocess documents
    doc1_text = extract_text_from_pdf(doc1_path)
    doc2_text = extract_text_from_pdf(doc2_path)
    doc1_tokens = preprocess(doc1_text)
    doc2_tokens = preprocess(doc2_text)
    documents = [doc1_tokens, doc2_tokens]

    # Calculate similarities
    tfidf_sim = float(tfidf_similarity(doc1_text, doc2_text))  # Convert to float
    lsi_sim = float(lsi_similarity(documents))  # Convert to float
    lda_sim = float(lda_similarity(documents))  # Convert to float
    doc2vec_sim = float(doc2vec_similarity(documents))  # Convert to float

    # Clean up temporary files
    os.remove(doc1_path)
    os.remove(doc2_path)

    return JSONResponse(content={
        "tfidf_similarity": tfidf_sim,
        "lsi_similarity": lsi_sim,
        "lda_similarity": lda_sim,
        "doc2vec_similarity": doc2vec_sim
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
