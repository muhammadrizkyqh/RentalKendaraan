import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDpNxxZYoTdtFEiKbIwuitx0WvSlJwpnEA",
    authDomain: "rentalkendaraan-facf9.firebaseapp.com",
    projectId: "rentalkendaraan-facf9",
    storageBucket: "rentalkendaraan-facf9.firebasestorage.app",
    messagingSenderId: "842320373264",
    appId: "1:842320373264:web:214b86f42b1dac8b0c0c95"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
