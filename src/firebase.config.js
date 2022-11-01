// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyApuSMmtRX7gWyOo4ihk-Kutb1PqCUZ4mw',
  authDomain: 'weatherapp-736e3.firebaseapp.com',
  projectId: 'weatherapp-736e3',
  storageBucket: 'weatherapp-736e3.appspot.com',
  messagingSenderId: '118101563375',
  appId: '1:118101563375:web:67c2e0216d2d43833d081a',
  measurementId: 'G-3Q8Q0MWGK0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
