import { AuthProvider } from '@redwoodjs/auth'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { setCustom } from 'firebase/auth'
import * as firebaseAuth from '@firebase/auth'
import { getAuth } from 'firebase/auth'
import * as admin from 'firebase-admin'

import {} from '@firebase/util'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,

  apiKey: 'AIzaSyDlr5xlq378B5vyetXvE_rK1r4EhPhFTt4',
  authDomain: 'redefine-erp.firebaseapp.com',

  /** Optional config, may be needed, depending on how you use firebase
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  **/
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()

// const firebaseApp = ((config) => {
//   const apps = getApps()
//   if (!apps.length) {
//     initializeApp(config)
//   }
//   return getApp()
// })(firebaseConfig)
// export const admin1 = admin
//   .auth()
//   .setCustomUserClaims('0HkJo6v6zeMeIH5DEPqjiHvwL2z2', { admin: true })
export const firebaseClient = {
  firebaseAuth,
  auth,
  app// optional
}
const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider client={firebaseClient} type="firebase">
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
