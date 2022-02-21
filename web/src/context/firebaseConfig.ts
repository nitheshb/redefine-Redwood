// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlr5xlq378B5vyetXvE_rK1r4EhPhFTt4',
  authDomain: 'redefine-erp.firebaseapp.com',
  projectId: 'redefine-erp',
  storageBucket: 'redefine-erp.appspot.com',
  messagingSenderId: '805525655781',
  appId: '1:805525655781:web:dfa846398899fe3ddc840c',
  measurementId: 'G-C2BJ3N02SQ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// export const auth = app.auth()
const auth = getAuth()
const analytics = getAnalytics(app)

export { auth }
