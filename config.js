import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBFpmpfdr1czlrPl2_bimMahsR1ff5PwC4",
  authDomain: "gifsearch-1e9b8.firebaseapp.com",
  projectId: "gifsearch-1e9b8",
  storageBucket: "gifsearch-1e9b8.appspot.com",
  messagingSenderId: "682558454868",
  appId: "1:682558454868:web:dce78cbd67f310bb1841c1",
  measurementId: "G-9M6NKR69ZQ",
  databaseURL: "https://gifsearch-1e9b8-default-rtdb.firebaseio.com"
};

export function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export function getDB() {
  if (firebase.apps.length) {
    return firebase.database();
  }
}
