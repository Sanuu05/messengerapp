// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlx3mOY62tYRj4OcZxWmA-yOCG5LMtZqg",
  authDomain: "messageapp-801b1.firebaseapp.com",
  projectId: "messageapp-801b1",
  storageBucket: "messageapp-801b1.appspot.com",
  messagingSenderId: "985568816512",
  appId: "1:985568816512:web:a6191e46f608874fc22565",
  measurementId: "G-74XNT13Y7Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()

const analytics = getAnalytics(app);