
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBy7PSbKcd3lAdKyC4MevA0YFAp6ve7wIE",
  authDomain: "health-app-f870c.firebaseapp.com",
  projectId: "health-app-f870c",
  storageBucket: "health-app-f870c.firebasestorage.app",
  messagingSenderId: "490468484996",
  appId: "1:490468484996:web:262343c59bf5ad3a3f9fd1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

