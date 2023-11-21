import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyADmhXM4codS-QKRy5t4V15_MWeL_I8UAw",
    authDomain: "olx-project-95235.firebaseapp.com",
    projectId: "olx-project-95235",
    storageBucket: "olx-project-95235.appspot.com",
    messagingSenderId: "1091241073281",
    appId: "1:1091241073281:web:2c358e2abde133a0060b80",
    measurementId: "G-DXG0NXC07L"
  };

 export default firebase.initializeApp(firebaseConfig)

