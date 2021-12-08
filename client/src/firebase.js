// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// firebase.auth() method used to authenticate user to our app
export const auth = firebase.auth();

// GoogleAuthProvider() is a public method used to obtain GoogleAuthCredentials
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
