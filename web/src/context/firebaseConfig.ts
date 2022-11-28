// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// import { initializeApp } from 'firebase-admin/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyDlr5xlq378B5vyetXvE_rK1r4EhPhFTt4',
//   authDomain: 'redefine-erp.firebaseapp.com',
//   projectId: 'redefine-erp',
//   storageBucket: 'redefine-erp.appspot.com',
//   messagingSenderId: '805525655781',
//   appId: '1:805525655781:web:dfa846398899fe3ddc840c',
//   measurementId: 'G-C2BJ3N02SQ',
// }

const firebaseConfig = {
  apiKey: "AIzaSyDlr5xlq378B5vyetXvE_rK1r4EhPhFTt4",
  authDomain: "redefine-erp.firebaseapp.com",
  projectId: "redefine-erp",
  storageBucket: "redefine-erp.appspot.com",
  messagingSenderId: "805525655781",
  appId: "1:805525655781:web:ea23286df1c6911ddc840c",
  measurementId: "G-XPGE6HF5G4"
};

const settings = {
  experimentalForceLongPolling: true,
}
let db, storage, auth, analytics
// Initialize Firebase
try {
  const app = initializeApp(firebaseConfig)
  // initializeFirestore(app, settings)

  // firebase.firestore().settings({ experimentalForceLongPolling: true });
  // const db = getFirestore(app)
   db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  })
   storage = getStorage()

  // export const auth = app.auth()
   auth = getAuth()
   analytics = getAnalytics(app)
} catch (error) {
console.log('error at auth', error)
}


export { auth, db, storage }
