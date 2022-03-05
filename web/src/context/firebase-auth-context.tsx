import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { auth } from './firebaseConfig'
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
import { useDispatch } from 'react-redux'
import { navigate, routes } from '@redwoodjs/router'
import { getUserSuccess } from 'src/state/actions/user'

export interface User {
  uid: string
  avatar: string
  email: string
  displayName: string

  [key: string]: unknown
}

interface State {
  isInitialized: boolean
  isAuthenticated: boolean
  user: User | null
}

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

type AuthStateChangedAction = {
  type: 'AUTH_STATE_CHANGED'
  payload: {
    isAuthenticated: boolean
    user?: User | null
  }
}

type Action = AuthStateChangedAction

interface AuthContextValue extends State {
  signInWithGoogle: () => Promise<unknown>
  login: (email: string, password: string) => Promise<unknown>
  logout: () => Promise<void>
  register: (email: string, password: string) => Promise<unknown>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  signInWithGoogle: () => Promise.resolve(),
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
})

const handlers = {
  AUTH_STATE_CHANGED: (state: State, action: Action): State => {
    const { isAuthenticated, user } = action.payload

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
}

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const dispatchToStore = useDispatch()

  const authenticate = useCallback(
    (currentUser) => {
      const user = {
        uid: currentUser.uid,
        avatar: currentUser.photoURL,
        email: currentUser.email,
        displayName: currentUser.displayName,
        phone: currentUser.phoneNumber,
        token: currentUser.uid,
        role: 'admin',
      }
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: true,
          user,
        },
      })
      dispatchToStore(getUserSuccess(user))
    },
    [dispatchToStore]
  )

  const deAuthenticate = () =>
    dispatch({
      type: 'AUTH_STATE_CHANGED',
      payload: {
        isAuthenticated: false,
        user: null,
      },
    })

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Here you should extract the complete user profile to make it available in your entire app.
      // The auth state only provides basic information.
      if (currentUser) {
        authenticate(currentUser)
      } else {
        deAuthenticate()
      }
    })
    return () => {
      unSubscribe()
    }
  }, [authenticate])

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email: string, password: string) {
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
    deAuthenticate()
    navigate(routes.login(), { replace: true })
    return signOut(auth)
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signInWithGoogle,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
