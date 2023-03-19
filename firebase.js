// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlpBRVRMVp5F4QdAWNJ3rVsJNL4-QD1rQ",
  authDomain: "messenger-256c6.firebaseapp.com",
  projectId: "messenger-256c6",
  storageBucket: "messenger-256c6.appspot.com",
  messagingSenderId: "988482474351",
  appId: "1:988482474351:web:895d43e0ed2c8a7c5d189a",
  measurementId: "G-8Q0PK8RJ19"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()

const analytics = getAnalytics(app);