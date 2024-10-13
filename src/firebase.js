// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import firebaseConfig from './firebaseConfig';
// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };