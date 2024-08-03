// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoNM3SnFLKXrUH04VmiDqOG_knN1yShSE",
  authDomain: "expense-tracker-app-e10e1.firebaseapp.com",
  projectId: "expense-tracker-app-e10e1",
  storageBucket: "expense-tracker-app-e10e1.appspot.com",
  messagingSenderId: "640143757802",
  appId: "1:640143757802:web:b28bcf2e2123db87086293"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);