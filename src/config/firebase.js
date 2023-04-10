import { useCollection, useFirebaseAuth } from 'vuefire'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, where, query } from 'firebase/firestore'
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCp8_1foMB86eZlaB6AIG5014TkMGky7xQ",
  authDomain: "contactlistsystem.firebaseapp.com",
  projectId: "contactlistsystem",
  storageBucket: "contactlistsystem.appspot.com",
  messagingSenderId: "235248627729",
  appId: "1:235248627729:web:67a677de1c67ac193281b0",
  measurementId: "G-V3HZPVH68Z"
})

export const db = getFirestore(firebaseApp)

// export const usersRef = useCollection(collection(db, 'users'))
// export const usersRef = useCollection(query(collection(db, 'users'), where("id", "==", "n8sa12ffJLIo8jFPoBWd")))

export const auth = useFirebaseAuth()

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     const uid = user.uid;
//     console.log('userUID', uid)
//   } else {
//   }
// })