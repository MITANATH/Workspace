import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {

  apiKey: "AIzaSyAJA0esCg6gB0rUBBm6iBmcSIanrW4GAQ4",

  authDomain: "khlogin-01.firebaseapp.com",

  databaseURL: "https://khlogin-01.firebaseio.com",

  projectId: "khlogin-01",

  storageBucket: "khlogin-01.appspot.com",

  messagingSenderId: "405781304253",

  appId: "1:405781304253:web:d82a78fc10c387a85978d4",

  measurementId: "G-L887L4HMFE"

};
// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}
