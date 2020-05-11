import * as firebase from 'firebase/app'

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAj_-I4giWAZlSrWrt8qMRCYGhKEC9y2bk",
  authDomain: "arqueologs.firebaseapp.com",
  databaseURL: "https://arqueologs.firebaseio.com",
  projectId: "arqueologs",
  storageBucket: "arqueologs.appspot.com",
  messagingSenderId: "468659259524",
  appId: "1:468659259524:web:994b28c26c4cde3a229ad1"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)

// ==== Firebase auth
export const firebaseAuth = firebaseApp.auth();


// ==== Firebase firestore db
export const db = firebaseApp.firestore();


export const dbUsers = db.collection("users");

export const dbCandidates = db.collection("arqueologs");

export const dblicenses = db.collection("licenses");

export const dbReports = db.collection("reports");



// ==== Firebase file storage

export const fbStorage = firebase.storage
export const storageRef = firebase.storage().ref()
export const imagesUsers = firebase.storage().ref().child('usersImages');