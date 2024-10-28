import pdfplumber  # Use pdfplumber for PDF extraction
import nltk
from gensim.models import TfidfModel, LsiModel, LdaModel, Doc2Vec
from gensim.corpora import Dictionary
from gensim.models.doc2vec import TaggedDocument
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize import word_tokenize
import numpy as np

nltk.download('punkt')

# Function to preprocess the text
def preprocess(doc):
    tokens = word_tokenize(doc.lower())
    tokens = [word for word in tokens if word.isalpha()]  # Keep only alphabetic tokens
    return tokens

# Function to calculate TF-IDF similarity
def tfidf_similarity(doc1, doc2):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([doc1, doc2])
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])  # Adjusted to get correct slice
    return similarity[0][0]

# Function to calculate LSI similarity
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

# Function to calculate LDA similarity
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

# Function to calculate Doc2Vec similarity
def doc2vec_similarity(documents):
    tagged_docs = [TaggedDocument(words=doc, tags=[str(i)]) for i, doc in enumerate(documents)]
    doc2vec_model = Doc2Vec(tagged_docs, vector_size=50, window=2, min_count=1, epochs=100)
    
    doc1_vec = doc2vec_model.infer_vector(documents[0])
    doc2_vec = doc2vec_model.infer_vector(documents[1])
    
    similarity = cosine_similarity([doc1_vec], [doc2_vec])
    return similarity[0][0]

# Function to calculate all similarities
def calculate_similarities(doc1_text, doc2_text):
    doc1_tokens = preprocess(doc1_text)
    doc2_tokens = preprocess(doc2_text)
    documents = [doc1_tokens, doc2_tokens]

    tfidf_sim = tfidf_similarity(doc1_text, doc2_text)
    lsi_sim = lsi_similarity(documents)
    lda_sim = lda_similarity(documents)
    doc2vec_sim = doc2vec_similarity(documents)

    return {
        "TF-IDF Similarity": tfidf_sim,
        "LSI Similarity": lsi_sim,
        "LDA Similarity": lda_sim,
        "Doc2Vec Similarity": doc2vec_sim
    }

# Function to extract text from PDF using pdfplumber
def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"  # Add a newline after each page
    return text
