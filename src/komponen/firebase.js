// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // jika pakai Realtime Database
import { getFirestore } from "firebase/firestore"; // jika pakai Firestore
import { getStorage } from "firebase/storage"; // jika pakai Storage
import { getAuth } from "firebase/auth"; // jika pakai Auth

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNGMFeUMr6TiSX0X4msRrttIY0rjJJGO8",
    authDomain: "wedding03-ff818.firebaseapp.com",
    databaseURL: "https://wedding03-ff818-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wedding03-ff818",
    storageBucket: "wedding03-ff818.firebasestorage.app",
    messagingSenderId: "307470739649",
    appId: "1:307470739649:web:065404657cd0f44f8e8c40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// service yang dibutuhkan
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
// Export the initialized services
export { app, database, firestore, storage, auth };
