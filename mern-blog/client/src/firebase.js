// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-3b012.firebaseapp.com",
  projectId: "mern-blog-3b012",
  storageBucket: "mern-blog-3b012.appspot.com",
  messagingSenderId: "188213493420",
  appId: "1:188213493420:web:d2cd2d83133be0d7576909"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);