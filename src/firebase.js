import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: 'AIzaSyCDQnZmxntj9OplzSptQxZni8ff01Ald7s',
  authDomain: 'fir-appauth-ccc2a.firebaseapp.com',
  projectId: 'fir-appauth-ccc2a',
  storageBucket: "fir-appauth-ccc2a.appspot.com",
  messagingSenderId: "150660062576",
  appId: "1:150660062576:web:b01b992d0ff061762883b5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);