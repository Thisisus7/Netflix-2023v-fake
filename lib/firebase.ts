// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNvFbFc49Av1PXKu7cN-7nr02Qbtu8q-g",
    authDomain: "netflix-fake-ddb86.firebaseapp.com",
    projectId: "netflix-fake-ddb86",
    storageBucket: "netflix-fake-ddb86.appspot.com",
    messagingSenderId: "93627947762",
    appId: "1:93627947762:web:a6fcd946ecc97e4e850e6b"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }