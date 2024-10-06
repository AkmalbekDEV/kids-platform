import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBnun7MT9NPZO0QQ1c6Oq9v43h59oo2h9g",
    authDomain: "kids-math-platform.firebaseapp.com",
    projectId: "kids-math-platform",
    storageBucket: "kids-math-platform.appspot.com",
    messagingSenderId: "366926304927",
    appId: "1:366926304927:web:71b01e698dbfb102dc74aa",
    measurementId: "G-MESMV5TJNZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };