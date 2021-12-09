import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0vMwY3qP1cXIar2LMk2zX8GiroHtwlcI',
  authDomain: 'ecommerce-448d7.firebaseapp.com',
  projectId: 'ecommerce-448d7',
  storageBucket: 'ecommerce-448d7.appspot.com',
  messagingSenderId: '529985377826',
  appId: '1:529985377826:web:acea2c62024058b0badc7b',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
