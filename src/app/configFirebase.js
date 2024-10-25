"useClient"

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
  import {getDatabase} from "firebase/database"
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
  const db  =getDatabase(app)

  export {auth, db}