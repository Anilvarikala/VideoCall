

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbOCY6pEO8Tjudffti1Ufp800WUEnlxQ0",
  authDomain: "videocall-5d678.firebaseapp.com",
  projectId: "videocall-5d678",
  storageBucket: "videocall-5d678.firebasestorage.app",
  messagingSenderId: "587798037393",
  appId: "1:587798037393:web:695b5d720e44595a241030",
  measurementId: "G-C9HN3HPND2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);


// Export everything
export { db, auth}
export {collection,addDoc,getDoc,doc,onSnapshot};