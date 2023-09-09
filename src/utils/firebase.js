// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlsWI9fIPGiJJZPk_g3k-LFDr2QiXUUEI",
  authDomain: "netflix-gpt-51fd6.firebaseapp.com",
  projectId: "netflix-gpt-51fd6",
  storageBucket: "netflix-gpt-51fd6.appspot.com",
  messagingSenderId: "720496151844",
  appId: "1:720496151844:web:43bf9f7ef1e278a8a977b1",
  measurementId: "G-PK24JT4EYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();