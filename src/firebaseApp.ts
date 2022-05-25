import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDMAsfEZH_DMm8yj47OTPy9Z2tg83kk6Kw',
  authDomain: 'w4stedfy.firebaseapp.com',
  projectId: 'w4stedfy',
  storageBucket: 'w4stedfy.appspot.com',
  messagingSenderId: '953809056890',
  appId: '1:953809056890:web:9222c9245b904fc4dd77c3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const bandsRef = collection(db, 'bands');
export const contentRef = collection(db, 'content');
export const tracksRef = collection(db, 'tracks');
