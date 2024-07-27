// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUaRF8aPo1X9BLiAYMeu2xYQwsODlWypA",
    authDomain: "keep-clone-480b9.firebaseapp.com",
    projectId: "keep-clone-480b9",
    storageBucket: "keep-clone-480b9.appspot.com",
    messagingSenderId: "167281972807",
    appId: "1:167281972807:web:1117fa7b81de6d4b10c362",
    measurementId: "G-CXE1BHGKW2"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
