// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyDJifcsLWACeI39woUwUrHaD295aSYKbs4",

  authDomain: "property-pro-5d7bb.firebaseapp.com",

  projectId: "property-pro-5d7bb",

  storageBucket: "property-pro-5d7bb.appspot.com",

  messagingSenderId: "1001293730208",

  appId: "1:1001293730208:web:b4c8489d42a48a65d3d4c5",

  measurementId: "G-HX8XPBZVNQ"

};


// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
