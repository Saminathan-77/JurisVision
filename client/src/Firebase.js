import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (replace with your actual credentials from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyCDaHLjvVfmrr56z2ZWuOT7bYDPZIR8AVs",
    authDomain: "jurisvision-1e318.firebaseapp.com",
    projectId: "jurisvision-1e318",
    storageBucket: "jurisvision-1e318.appspot.com",
    messagingSenderId: "1056400034855",
    appId: "1:1056400034855:web:f497ef1034110a7fbfd202",
    measurementId: "G-LPBD01M27D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
