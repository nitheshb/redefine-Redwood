import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './firebaseConfig'
import { useDispatch } from 'react-redux'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'
import { navigate, routes } from '@redwoodjs/router'
import { getUserSuccess } from 'src/state/actions/user'

const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  // eslint-disable-next-line no-undef
  login: (_email = string, _password = string) => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
})

export const addRole = (uId) => {
  return auth.setCustomUserClaims(uId, { admin: true })
}

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null)
      user && dispatch(getUserSuccess(user))
    })
    return () => {
      unsubscribe()
    }
  }, [dispatch])

  // useEffect(() => {
  //   navigate(routes.newHomePage())
  // }, [currentUser])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    navigate(routes.login(), { replace: true })
    return signOut(auth)
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
