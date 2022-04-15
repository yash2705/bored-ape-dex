import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkdpMf3u68qe_enqVFzgV3IMOPosCYJHo",
  authDomain: "bored-ape-gaming-token.firebaseapp.com",
  projectId: "bored-ape-gaming-token",
  storageBucket: "bored-ape-gaming-token.appspot.com",
  messagingSenderId: "845630249049",
  appId: "1:845630249049:web:8a9ed9bbfa0e0240407948",
  measurementId: "G-DFBQF53KZS",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
