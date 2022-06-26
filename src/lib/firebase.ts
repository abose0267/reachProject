import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyA-mW4zkMals3Xx2XCEnezJvZcoz5w3tJI",
  authDomain: "reach-project-ddbe2.firebaseapp.com",
  projectId: "reach-project-ddbe2",
  storageBucket: "reach-project-ddbe2.appspot.com",
  messagingSenderId: "276446458257",
  appId: "1:276446458257:web:d8a9ff004c4e8ca2642a30",
  measurementId: "G-H62JS8ZD56"
};

export const firebase = initializeApp(config);
export const auth = getAuth(firebase)
export const db = getFirestore(firebase);

// firebase.