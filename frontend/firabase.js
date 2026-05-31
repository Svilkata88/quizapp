// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0Z4XzvMCS7pr6dLq4F05YxhQow_4bfPg",
  authDomain: "quizzy-98bc5.firebaseapp.com",
  projectId: "quizzy-98bc5",
  storageBucket: "quizzy-98bc5.firebasestorage.app",
  messagingSenderId: "569263113256",
  appId: "1:569263113256:web:41962b9343ec9d5311211d",
  measurementId: "G-MNSEV4HRBT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
