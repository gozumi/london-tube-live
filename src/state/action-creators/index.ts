import { auth, database, googleAuthProvider } from './../../firebase'
import {
  ATTEMPTING_SINGING_IN,
  ATTEMPTING_SINGING_OUT,
  SIGNED_IN,
  SIGNED_OUT
} from '../actions'

const userRef = database.ref('users')

export function attemptSignIn() {
  return (dispatch: any) => {
    dispatch({ type: ATTEMPTING_SINGING_IN })
    auth.signInWithPopup(googleAuthProvider)
  }
}

export function signedIn(user: any) {
  return {
    type: 'SIGNED_IN',
    payload: {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid
    }
  }
}

export function attemptSignOut() {
  return (dispatch: any) => {
    dispatch({ type: ATTEMPTING_SINGING_OUT })
    auth.signOut()
  }
}

export function signedOut() {
  return { type: SIGNED_OUT }
}

export function startListeningToAuthChanges () {
  return (dispatch: any) => {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        dispatch(signedIn(user))
        userRef.child(user.uid).set({
          displayName: user.displayName,
          email: user.email
        })
      } else {
        dispatch(signedOut())
      }
    })
  }
}
