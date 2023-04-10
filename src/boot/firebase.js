import { boot } from 'quasar/wrappers'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCp8_1foMB86eZlaB6AIG5014TkMGky7xQ",
  authDomain: "contactlistsystem.firebaseapp.com",
  projectId: "contactlistsystem",
  storageBucket: "contactlistsystem.appspot.com",
  messagingSenderId: "235248627729",
  appId: "1:235248627729:web:67a677de1c67ac193281b0",
  measurementId: "G-V3HZPVH68Z"
};

// Initialize Firebase
const appConfig = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(appConfig);

const auth = getAuth(appConfig);

export default boot(({ app }) => {

  app.config.globalProperties.$db = db
  app.config.globalProperties.$auth = auth
})
