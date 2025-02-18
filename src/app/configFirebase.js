"useClient";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuXnsHIbbr-OPJr607kvi0JTI-1Uhb6BE",
  authDomain: "recipebook-cf446.firebaseapp.com",
  databaseURL: "https://recipebook-cf446-default-rtdb.firebaseio.com",
  projectId: "recipebook-cf446",
  storageBucket: "recipebook-cf446.appspot.com",
  messagingSenderId: "850048654425",
  appId: "1:850048654425:web:7b9fd8e9afaea69d836548",
  measurementId: "G-W922TLKM3H",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
