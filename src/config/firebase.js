import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAEy9IcXCd4gryKujxOmo2w5B8D3_DVoGA',
  authDomain: 'lumina-8fa6d.firebaseapp.com',
  projectId: 'lumina-8fa6d',
  storageBucket: 'lumina-8fa6d.firebasestorage.app',
  messagingSenderId: '142923429686',
  appId: '1:142923429686:web:ef02cb6edc601eff9e2597',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
