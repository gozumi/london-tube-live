import * as firebase from 'firebase'

const config = {
  apiKey: <your api key>,
  authDomain: <your auth domain>,
  databaseURL: <yourdatabase url>,
  projectId: <you project id>,
  storageBucket: <your storage bucket>,
  messagingSenderId: <your message sender id>
}

firebase.initializeApp(config)

export default firebase

export const database = firebase.database()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
