// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBAE_API_KEY,
  authDomain: "fir-firebase-359ff.firebaseapp.com",
  projectId: "fir-firebase-359ff",
  storageBucket: "fir-firebase-359ff.appspot.com",
  messagingSenderId: "533288328094",
  appId: "1:533288328094:web:10e800b4fddf2f6ee4548f",
  measurementId: "G-G4DJ75S1R5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);